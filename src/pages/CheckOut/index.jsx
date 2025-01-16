import { useNavigate, useLocation } from "react-router-dom"
import { useState } from "react"
import { Empty, ShoppingCart } from "@phosphor-icons/react"
import Modal from "react-modal"
import './CheckOut.css'

export default function CheckOut () {

    const navigate = useNavigate()
    const location = useLocation()

    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')))
    const [total, setTotal] = useState(JSON.parse(localStorage.getItem('total')))
    const [modalIsOpen, setIsOpen] = useState(false)

    const aumentar = (product) => {
        cart.map((item) => {
            if (item.id == product.id) {
                item.quantidade = item.quantidade + 1
                setTotal(total + product.price)
                return item
            }
        })
    }

    const diminuir = (product) => {
        cart.map((item) => {
            if (item.id == product.id && item.quantidade >= 2) {
                item.quantidade = item.quantidade - 1
                setTotal(total - product.price)
                return item
            }
        })
    }

    const excluirItem = (product, i) => {
        cart.splice(i, 1)
        setTotal(total - (product.price*product.quantidade))
    }

    localStorage.setItem('cart', JSON.stringify(cart))
    localStorage.setItem('total', JSON.stringify(total))

    const openModal = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    return (
        <>
            <header>
                <div><img width='100px' src="/public/logo.png" alt="" /></div>
                <div><h1>ShopCart</h1></div>
                <button onClick={ openModal }>Ver Carrinho</button>
            </header>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Exemple Modal"
                overlayClassName="modal-overlay"
                className="modal-content">
                
                <div class="carrinho">
                    <table>
                        <thead style={ cart.length == 0 ? {display: 'none'} : {display: '-ms-flexbox'} }>
                            <tr>
                            <th>Item</th>
                            <th>Imagem</th>
                            <th>Título</th>
                            <th>Preço</th>
                            <th>Quantidade</th>
                            <th>Excluir</th>
                            </tr>
                        </thead>

                        <tbody> 
                            { cart.map((product, i) => {
                                return(
                                    <> 
                                        <tr>
                                        <td> { i + 1 } </td>
                                        <td><img width='40px' src={ product.image } alt="" /></td>
                                        <td><strong>{ product.title }</strong></td>
                                        <td>R$ { product.price.toFixed(2) }</td>
                                        <td>
                                            <button class='quantidade' onClick={ () => diminuir(product) }>-</button>
                                            <span>{ product.quantidade }</span>
                                            <button class='quantidade' onClick={ () => aumentar(product) }>+</button></td>
                                        <td><button class='quantidade' onClick={ () => excluirItem(product, i) }>Excluir</button></td>
                                        </tr>
                                    </>
                                )
                                })
                            }
                        </tbody>
                    </table>

                <h3 style={ cart.length == 0 ? {display: 'none'} : {display: '-ms-flexbox'} }>Total: R$ { total.toFixed(2) }</h3>
                
                { cart.length == 0 ? <abbr title="Seu carrinho está vazio"><Empty size={32} /></abbr> : <p></p>}

            </div>

                <button onClick={ closeModal }>Fechar Carrinho</button>
                
            </Modal>

            <button onClick={ () => {navigate('/products')} } >Voltar</button>
            
            <div class="produtos" style={ cart.length == 0 ? {display: 'none'} : {display: '-ms-flexbox'} }>
                <h2>Pagamento</h2>
                <label for="formaPgto">Selecione a forma de pagamento:</label>
                <select name="formaPgto" id="formaPgto">
                    <option value="cartaocredito">Cartão de Crédito</option>
                    <option value="cartaodebito">Cartão de Débito</option>
                    <option value="boleto">Boleto</option>
                    <option value="pix">PIX</option>
                </select>
            </div>

            <div class="produtos" style={ cart.length == 0 ? {display: 'none'} : {display: '-ms-flexbox'} }>
                <h2>Endereço para Entrega</h2>
                <input type="text" placeholder="CEP" />
                <input type="text" placeholder="Logradouro"/>
                <input type="text" placeholder="Número" />
                <input type="text" placeholder="Bairro" />
                <input type="text" placeholder="Ponto de referência" />
                <input type="text" placeholder="Cidade" />
                <input type="text" placeholder="Estado" />
                <input type="text" placeholder="País" />
            </div>

            <button style={ cart.length == 0 ? {display: 'none'} : {display: '-ms-flexbox'} } onClick={ () => { alert('Suas compras serão enviadas assim que o pagamento for confirmado!') }}>Finalizar compra</button>
        </>
    )
}