//SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "./interfaces/INTT.sol";

contract Granteed is Ownable {
    using SafeERC20 for IERC20;
    enum Status {
        Pending,
        Approved,
        Accepted,
        InProgress,
        Finished
    }
    mapping(address => mapping(uint256 => Grant)) public grants;
    mapping(address => uint256) public grantCounter;
    mapping(uint256 => uint256) public categoryWeights;
    mapping(uint256 => bool) public nonceToBool;
    mapping(address => mapping(uint256 => mapping(address => bool))) requests;
    IERC20 public immutable tusd;
    INTT public immutable sis;

    constructor(address _tusd, address _sis) {
        require(
            _tusd != address(0) && _sis != address(0),
            "Address cannot be zero"
        );
        tusd = IERC20(_tusd);
        sis = INTT(_sis);
    }

    struct Grant {
        Status status;
        uint256 category;
        uint256 esroi;
        bool legal;
        uint256[] amounts;
        uint256 phase;
        bytes32 blobHash;
        address company;
    }

    function setCategory(uint256 category, uint256 categoryWeight)
        external
        onlyOwner
    {
        categoryWeights[category] = categoryWeight;
    }

    function addGrant(
        uint256 category,
        bool legal,
        uint256[] calldata amounts,
        uint256 roi,
        uint256 nonce,
        bytes32 blobhash,
        bytes memory signature
    ) external {
        uint256 grantId = grantCounter[msg.sender];
        // require(
        //     verifyRoiSig(grantId, roi, nonce, blobhash, signature),
        //     "Invalid Signature"
        // );
        // require(!nonceToBool[nonce], "Nonce already used");
        // nonceToBool[nonce] = true;

        grants[msg.sender][grantId] = Grant({
            status: Status.Approved,
            category: category,
            esroi: roi,
            legal: legal,
            amounts: amounts,
            phase: 0,
            blobHash: blobhash,
            company: address(0)
        });

        grantCounter[msg.sender]++;
    }

    function verifyAcceptSig(
        uint256 grantId,
        address company,
        uint256 nonce,
        bytes memory signature
    ) public view returns (bool) {
        bytes32 messageHash = keccak256(
            abi.encodePacked(grantId, company, nonce)
        );
        bytes32 ethSignedMessageHash = getEthSignedMessageHash(messageHash);
        return recoverSigner(ethSignedMessageHash, signature) == owner();
    }

    function verifyRoiSig(
        uint256 grantId,
        uint256 roi,
        uint256 nonce,
        bytes32 blobhash,
        bytes memory signature
    ) public view returns (bool) {
        bytes32 messageHash = keccak256(
            abi.encodePacked(grantId, roi, nonce, blobhash)
        );
        bytes32 ethSignedMessageHash = getEthSignedMessageHash(messageHash);
        return recoverSigner(ethSignedMessageHash, signature) == owner();
    }

    function getEthSignedMessageHash(bytes32 _messageHash)
        public
        pure
        returns (bytes32)
    {
        /*
        Signature is produced by signing a keccak256 hash with the following format:
        "\x19Ethereum Signed Message\n" + len(msg) + msg
        */
        return
            keccak256(
                abi.encodePacked(
                    "\x19Ethereum Signed Message:\n32",
                    _messageHash
                )
            );
    }

    function recoverSigner(
        bytes32 _ethSignedMessageHash,
        bytes memory _signature
    ) public pure returns (address) {
        (bytes32 r, bytes32 s, uint8 v) = splitSignature(_signature);

        return ecrecover(_ethSignedMessageHash, v, r, s);
    }

    function splitSignature(bytes memory sig)
        public
        pure
        returns (
            bytes32 r,
            bytes32 s,
            uint8 v
        )
    {
        require(sig.length == 65, "invalid signature length");

        assembly {
            /*
            First 32 bytes stores the length of the signature

            add(sig, 32) = pointer of sig + 32
            effectively, skips first 32 bytes of signature

            mload(p) loads next 32 bytes starting at the memory address p into memory
            */

            // first 32 bytes, after the length prefix
            r := mload(add(sig, 32))
            // second 32 bytes
            s := mload(add(sig, 64))
            // final byte (first byte of the next 32 bytes)
            v := byte(0, mload(add(sig, 96)))
        }

        // implicitly return (r, s, v)
    }

    // function setRoi(
    //     uint256 grantId,
    //     uint256 roi,
    //     uint256 nonce,
    //     bytes32 blobhash,
    //     bytes memory signature
    // ) external {
    //     Grant storage grant = grants[msg.sender][grantId];
    //     require(grant.status == Status.Pending, "Grant already processed");
    //     require(
    //         verifyRoiSig(grantId, roi, nonce, blobhash, signature),
    //         "Invalid Signature"
    //     );
    //     require(!nonceToBool[nonce], "Nonce already used");
    //     nonceToBool[nonce] = true;

    //     grant.status = Status.Approved;
    //     grant.esroi = roi;
    //     grant.blobHash = blobhash;
    // }

    function setRequest(
        address to,
        uint256 grantId,
        bool isRequest
    ) external {
        Grant storage grant = grants[to][grantId];
        require(grant.status == Status.Approved, "Grant not Approved");
        if (isRequest)
            require(!requests[to][grantId][msg.sender], "Already requested");
        else require(requests[to][grantId][msg.sender], "Not requested");
        requests[to][grantId][msg.sender] = isRequest;
    }

    function acceptCompany(
        uint256 grantId,
        address company,
        uint256 nonce,
        bytes memory signature
    ) external onlyOwner {
        Grant storage grant = grants[msg.sender][grantId];
        require(requests[msg.sender][grantId][msg.sender], "Not valid request");
        require(grant.status == Status.Approved, "Grant not Approved");
        require(
            verifyAcceptSig(grantId, company, nonce, signature),
            "Invalid Signature"
        );
        require(!nonceToBool[nonce], "Nonce already used");
        nonceToBool[nonce] = true;

        grant.status = Status.Accepted;
        grant.company = company;
    }

    function proceedGrant(address to, uint256 grantId) external {
        Grant storage grant = grants[to][grantId];
        require(msg.sender == grant.company, "Not eligible");
        uint256 phase = grant.phase;
        if (phase == 0) {
            grant.status = Status.InProgress;
        }
        require(grant.status == Status.InProgress, "Grant is not in progress");
        uint256[] memory amounts = grant.amounts;

        uint256 amount = amounts[phase];
        tusd.safeTransfer(to, amount);
        uint256 rewardAmount = calculateSis(grant);
        sis.mint(to, rewardAmount);

        grant.phase++;
        if (phase == amounts.length) {
            grant.status = Status.Finished;
        }
    }

    //TODO optimize algo
    function calculateSis(Grant memory grant)
        public
        view
        returns (uint256 rewardAmount)
    {
        rewardAmount = (grant.amounts[grant.phase] *
            grant.esroi *
            categoryWeights[grant.category]);
        if (grant.legal) rewardAmount *= 2;
    }
}
