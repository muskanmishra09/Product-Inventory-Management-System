from fastapi.routing import APIRouter

from apis.utils.data_response import data_response
from apis.utils.status_response import status_response

from logic.orders import (
    get_all_orders_data,
    get_order_data_by_id,
    create_new_order,
    delete_order_data
)

from models.orders import Order


router = APIRouter()


@router.get("/orders")
async def get_orders():

    data = get_all_orders_data()

    return data_response(data)


@router.get("/orders/{id}")
async def get_order_by_id(id: int):

    data = get_order_data_by_id(id)

    return data_response(data)


@router.post("/orders")
async def post_order(order: Order):

    create_new_order(order)

    return status_response(True)


@router.delete("/orders/{id}")
async def delete_order(id: int):

    delete_order_data(id)

    return status_response(True)