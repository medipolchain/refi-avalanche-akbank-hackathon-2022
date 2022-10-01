import os
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv, find_dotenv

from pymongo import MongoClient

from web3 import Web3

import pydantic
from bson.objectid import ObjectId

pydantic.json.ENCODERS_BY_TYPE[ObjectId] = str

app = FastAPI()
web3 = Web3()

load_dotenv(find_dotenv())
client = MongoClient(os.environ.get("MONGODB_PWD"))

grand_categories = {
    0: "Education",

}


def get_database_names():
    """
    :return: a list of all the database names
    """
    try:
        dbs = client.list_database_names()
        return dbs

    except Exception as e:
        print(e)
        return e


def get_database(db_name: str):
    """
    :param db_name: the name of the database to get
    :return: the database object
    """
    try:
        db = client[db_name]
        return db

    except Exception as e:
        print(e)
        return e


def get_collections_names(db_name: str):
    """
    :param db_name: the name of the database to get the collections from
    :return: a list of all the collections in the database
    """
    try:
        db = get_database(db_name)
        collections = db.list_collection_names()
        return collections

    except Exception as e:
        print(e)
        return e


def get_collection(collection_name: str):
    """
    :param db_name: the name of the database to get the collection from
    :param collection_name: the name of the collection to get
    :return: the collection object
    """
    try:
        db = get_database("pandas")
        collection = db[collection_name]
        return collection

    except Exception as e:
        print(e)
        return e


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


@app.post("/set_grant")
async def set_grant(req: Request):
    """
    :param req: the request object
    :return: the result of the operation
    """
    """
    grant_info = {
        "name": "Akbank ReFi Hackathon",
        "description": "Akbank ReFi Hackathon",
        "index": 0,
        "category": 0,
        "year": 2021,
        "location": "Istanbul",
        "budget": 100000,
        "impact_area": 150, # square meters
        "impact_people": 1000,
        "average_age": 25,
        "legal": True,
        "date": 6, # months
        "report_hash": 0x1234567890,
        "activities": 6, # total number of activities required to complete the grant
    }
    """
    try:
        data = await req.json()
        db = get_database("grants")
        collection = db["grants"]
        result = collection.insert_one(data)
        return result

    except Exception as e:
        return e


@app.get("/get_grants")
async def get_grants():
    """
    :return: the result of the operation
    """
    try:
        db = get_database("grants")
        collection = db["grants"]
        result = collection.find()
        return list(result)

    except Exception as e:
        return e


@app.get("/get_grant")
async def get_grant(req: Request):
    """
    :return: the result of the operation
    """
    try:
        data = await req.json()
        data = data["id"]
        db = get_database("grants")
        collection = db["grants"]
        result = collection.find_one(data)
        return result

    except Exception as e:
        return e
