import subprocess
from time import time


class BlobCom:

    def __init__(self, rpc_url, blob_path):
        self.rpc_url = rpc_url
        self.blob_path = blob_path

    def set_text(self, text):
        text = f"{time()}-{text}"
        out = subprocess.check_output([f"{self.blob_path}blob-cli", "set", text, "--endpoint", self.rpc_url])
        try:
            return out.decode("utf-8").split()[-1]
        except Exception as e:
            return False

    def get_blob(self, blobhash):
        out = subprocess.check_output([f"{self.blob_path}blob-cli", "resolve", blobhash, "--endpoint", self.rpc_url])
        try:
            decoded_out = out.decode("utf-8")
            metadataIndex = decoded_out.rfind("\nMetadata")
            decoded_out = decoded_out[:metadataIndex - 1]
            identifierIndex = decoded_out.rfind("-")
            assert (identifierIndex != -1)
            decoded_out = decoded_out[identifierIndex + 1:]
            return decoded_out
        except Exception as e:
            return False


if __name__ == "__main__":
    rpc_url = "http://127.0.0.1:9650/ext/bc/hkyNydABLfSvASVMKDvkKAbD4ac2UJRZ4Fb6ukhHN2WSe1jF2"
    blob_path = "/home/yusufbenli/blob/blobvm/build/"
    blobCom = BlobCom(rpc_url=rpc_url, blob_path=blob_path)
