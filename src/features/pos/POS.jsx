import { Button, Collapse, Input, Popconfirm } from "antd"
import { IoMdRefresh } from "react-icons/io";
import { FaPlus, FaTrash } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa6";
import { RiSecurePaymentLine } from "react-icons/ri";
import { FaHandsHoldingCircle } from "react-icons/fa6";
import { IoSearchCircle } from "react-icons/io5";
import useProducts from '../store/products/useProducts'
import { useEffect, useState } from "react";

function POS() {


  const [carts, setCarts] = useState([])

  const cartsDisplay = carts.map((cart) => ({
    key: cart.id,
    label: <CartLabel title={cart.product.title} image={cart.product.image} />,
    children: <CartItems quantity={cart.quantity} discount={cart.discount} id={cart.id} setCarts={setCarts} />
  }))


  const { products } = useProducts()
  const [displayProducts, setDisplayProducts] = useState(products)
  const [report, setReport] = useState({
    subtotal: 0,
    discount: 0,
    payble_amount: 0,
  })

  useEffect(() => {
    if (carts) {
      let subtotal = carts.reduce((total, currentValue) => {
        return total + currentValue.total
      }, 0)
      let discount = carts.reduce((total, currentValue) => {
        total = total + (currentValue.total * currentValue.discount / 100)
        return total
      }, 0)
      let payble_amount = subtotal - discount

      setReport({ subtotal: subtotal, discount: discount, payble_amount: payble_amount })
    }
  }, [carts])
  const filterdByCategory = (category) => {
    let filterdCtategory = products.filter((product) => {
      return product.category.toLowerCase() == category
    })
    setDisplayProducts(filterdCtategory)
  }

  return (
    <main className="w-full h-full text-black flex">
      <section className="h-full w-9/12">
        <div className="bg-stone-100 h-1/10 p-2 flex justify-center items-center">
          <Input placeholder="Enter Your Barcode: 00000000000000000" />
        </div>
        <div className="bg-stone-50 h-1/10 p-3 flex justify-between items-center">
          <section className="flex gap-2 w-6/10 items-center">
            <Badge label={'Laptop'} active={true} onClick={() => filterdByCategory('laptop')} />
            <Badge label={'Mobile'} active={false} onClick={() => filterdByCategory('mobile')} />
            <Badge label={'Keyboard'} active={false} onClick={() => filterdByCategory('keyboard')} />
            <Badge label={'LCD'} active={false} onClick={() => filterdByCategory('lcd')} />
          </section>
          <section className="w-4/10">
            <Input prefix={<IoSearchCircle size={32} />} placeholder="Search Item" onChange={(e) => {
              let filterdProducts = products.filter((product) => {
                return product.title.toLowerCase().includes(e.target.value.toLowerCase())
              })
              setDisplayProducts(filterdProducts)
              if (e.target.value == '') {
                setDisplayProducts(products)
              }
            }} />
          </section>
        </div>
        <div className="bg-gray-200 h-8/10 overflow-auto flex flex-wrap p-2 gap-5">
          {displayProducts?.map((product) => (
            <Card setCarts={setCarts} product={product} title={product?.title} price={product?.price} image={product?.image} />
          ))}
        </div>
      </section>
      <section className=" h-full w-3/12">
        <div className="bg-stone-100 h-1/10 flex justify-between items-center p-2">
          <section >
            <Button type="primary">+ Add Customer</Button>
          </section>
          <section className="flex gap-2">
            <Button>
              <IoMdRefresh />
            </Button>
            <Button>
              <FaPlus />
            </Button>
            <Button>
              <FaCartPlus />
            </Button>
          </section>

        </div>
        <div className=" overflow-auto h-6/10">
          <Collapse items={cartsDisplay} />
        </div>
        <div className="bg-gray-100 h-2/10 p-2 flex flex-col justify-center">
          <section className="flex justify-between">
            <h1>Subtotal</h1>
            <h1>{report?.subtotal} AFN</h1>
          </section>
          <section className="flex justify-between">
            <h1>Discount</h1>
            <h1>{report?.discount} AFN</h1>
          </section>
          <section className="flex justify-between">
            <h1>Payable Amount</h1>
            <h1>{report?.payble_amount} AFN</h1>
          </section>
        </div>
        <div className="bg-gray-800 h-1/10 flex justify-between items-center p-1 gap-1">
          <Button icon={<FaHandsHoldingCircle />} danger className="w-full">Hold Order</Button>
          <Button icon={<RiSecurePaymentLine />} type="primary" className="w-full" >Procced</Button>
        </div>
      </section>
    </main>
  )
}

const Card = ({ image, title, price, product, setCarts }) => {

  const [quantity, setQuantity] = useState(1)

  const newCartHandle = () => {
    const newCart = {
      id: Math.floor(Math.random() * 1000),
      product: product,
      discount: '0',
      price: price,
      total: price * quantity,
      quantity: quantity
    }
    setCarts((prev) => {
      return [...prev, newCart]
    })
  }




  return (
    <Popconfirm onConfirm={newCartHandle} title='Enter Quantity' description={<Input size="small" type={'number'} value={quantity} onChange={(e) => {
      setQuantity(e.target.value)
    }} />}>
      <div className=" bg-rose-100 h-5/10 p-2 shadow-2xl shadow-gray-900 w-2/11 rounded hover:bg-gray-200 hover:scale-101">
        <img src={image} className="h-7/10 object-cover rounded-xl" />
        <h1 className="text-xl font-bold">{title}</h1>
        <h1>Price: {price} AFN</h1>
      </div>
    </Popconfirm>
  )
}

const CartItems = ({ quantity, discount, id, setCarts }) => {

  const remove = () => {
    setCarts(prev => {
      const deleteIndex = prev.findIndex((cart) => cart.id == id)
      const carts = [...prev]
      carts.splice(deleteIndex, 1)
      return carts
    })
  }

  return (
    <section className="bg-rose-200 rounded-xl flex justify-between p-2 items-center gap-2">
      <div className="flex items-center gap-2">
        <label>Quantity</label>
        <Input value={quantity} />
      </div>
      <div className="flex items-center gap-2">
        <label>Discount</label>
        <Input value={discount} />
      </div>
      <div className="flex items-center gap-2">
        <Button onClick={remove} size="small" danger type="primary"><FaTrash /></Button>
      </div>
    </section>
  )
}

const CartLabel = ({ title, image }) => {

  return (
    <div className="flex justify-between">
      <h1>{title}</h1>
      <img className="w-10 h-10 object-fit rounded-full" src={image} />
    </div>
  )
}

const Badge = ({ active, label, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`p-1 px-2 ${active ? 'bg-blue-600 text-white' : 'bg-stone-300 text-gray-500'} cursor-pointer rounded text-[15px] w-fit`}
    >
      {label}
    </div>
  )
}

export default POS