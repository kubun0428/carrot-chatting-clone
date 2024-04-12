from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

app = FastAPI()

class ChatContent(BaseModel):
    id:str
    content:str
    
chats = []

@app.post("/chats")
def create_chat(chat:ChatContent):
    chats.append(chat)
    return 'POST 성공'

@app.get("/chats")
def read_chats():
    return chats

app.mount("/", StaticFiles(directory='static', html=True), name='static')