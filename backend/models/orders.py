from pydantic import BaseModel


class Order(BaseModel):
    id: int | None = None
    customer_id: int
    product_id: int
    quantity: int