from fastapi import FastAPI, Request
from db_wrapper import DbWrapper
from fastapi.middleware.cors import CORSMiddleware

from web3 import Web3

import pydantic
from bson.objectid import ObjectId

pydantic.json.ENCODERS_BY_TYPE[ObjectId] = str

app = FastAPI()
db = DbWrapper()
web3 = Web3()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    """
    :return: a welcoming screen
    :return:
    """
    try:
        return {"Avalanche x Akbank ReFi Hackathon API by @MedipolDAO"}

    except Exception as e:
        return e
