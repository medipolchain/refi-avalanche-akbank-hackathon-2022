import os
import jwt
from web3 import Web3
from pymongo import MongoClient
from dotenv import load_dotenv, find_dotenv
from fastapi.exceptions import HTTPException
from datetime import datetime, timezone, timedelta
from eth_account.messages import encode_defunct

import pydantic
from bson.objectid import ObjectId

pydantic.json.ENCODERS_BY_TYPE[ObjectId] = str

load_dotenv(find_dotenv())


class DbWrapper:
    def __init__(self):
        self.setup()

    def setup(self) -> bool:
        """
        :return: True if connected to the MongoDB, Error otherwise
        """
        try:
            self.connection_string = os.environ.get("MONGODB_PWD")
            self.client = MongoClient(self.connection_string)
            self.web3 = Web3()

        except Exception as e:
            print(e)
            return e

    def get_database_names(self):
        """
        :return: a list of all the database names
        """
        try:
            dbs = self.client.list_database_names()
            return dbs

        except Exception as e:
            print(e)
            return e

    def get_database(self, db_name: str):
        """
        :param db_name: the name of the database to get
        :return: the database object
        """
        try:
            db = self.client[db_name]
            return db

        except Exception as e:
            print(e)
            return e

    def get_collections_names(self, db_name: str):
        """
        :param db_name: the name of the database to get the collections from
        :return: a list of all the collections in the database
        """
        try:
            db = self.get_database(db_name)
            collections = db.list_collection_names()
            return collections

        except Exception as e:
            print(e)
            return e

    def get_collection(self, collection_name: str):
        """
        :param db_name: the name of the database to get the collection from
        :param collection_name: the name of the collection to get
        :return: the collection object
        """
        try:
            db = self.get_database("pandas")
            collection = db[collection_name]
            return collection

        except Exception as e:
            print(e)
            return