from pydantic import BaseModel


class Customer(BaseModel):
    full_name: str
    email: str
    phone: str