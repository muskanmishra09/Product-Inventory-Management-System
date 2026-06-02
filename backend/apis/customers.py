from fastapi.routing import APIRouter

from apis.utils.data_response import data_response
from apis.utils.status_response import status_response

from logic.customers import (
    get_all_customers_data,
    get_customer_data_by_id,
    create_new_customer,
    delete_customer_data,
    update_customer_data
)

from models.customers import Customer

router = APIRouter()


@router.get("/customers")
async def get_customers():
    data = get_all_customers_data()
    return data_response(data)


@router.get("/customers/{id}")
async def get_customer_by_id(id: int):
    data = get_customer_data_by_id(id)
    return data_response(data)


@router.post("/customers")
async def post_customer(customer: Customer):
    create_new_customer(customer)
    return status_response(True)


@router.delete("/customers/{id}")
async def delete_customer(id: int):
    delete_customer_data(id)
    return status_response(True)


@router.put("/customers/{id}")
async def put_customer(id: int, customer: Customer):
    update_customer_data(id, customer)
    return status_response(True)