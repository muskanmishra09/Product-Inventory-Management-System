from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.apis import (
    producers,
    customers,
    categories,
    products,
    orders,
    sales,
    update_stock,
    update_prices
)
print("CORS FILE LOADED")
app = FastAPI(
    title="Inventory Management System API"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(producers.router)
app.include_router(customers.router)
app.include_router(categories.router)
app.include_router(products.router)
app.include_router(orders.router)
app.include_router(sales.router)
app.include_router(update_stock.router)
app.include_router(update_prices.router)

@app.get("/")
async def read_root():
    return {
        "message": "Inventory Management System API Running Successfully"
    }