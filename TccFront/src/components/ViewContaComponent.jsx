import React, { Component } from 'react'
import ContaService from '../services/ContaService'
import moment from 'moment';

class ViewContaComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            conta: {}
        }

        this.showHome = this.showHome.bind(this);
        this.showListar = this.showListar.bind(this);
    }

    componentDidMount(){
        ContaService.getContaById(this.state.id).then( res => {
            this.setState({conta: res.data});
        })
    }

    showHome(){
        this.props.history.push('/show-home');
    }

    showListar(){
        this.props.history.push('/contas');
    }

    dateFormat(dt) {
        return moment(dt).format("DD/MM/YYYY");
    }

    render() {
        return (
            <div>
                <div className="row mt-5">
                    <div className="col-sm-6">
                    <h2 className="row text-let">Detalhes</h2>
                    </div>
                    <div className="col-sm-6">
                        <div className="row float-right">
                            <button className="btn btn-info " onClick={this.showHome}> Home</button>  &nbsp;&nbsp;
                            <button className="btn btn-warning " onClick={this.showListar}> Listar</button> 
                        </div>
                    </div>    
                    <div className="col-sm-12">
                        <hr className="row"/>
                    </div>    
                </div>

                <div className = "container mt-5">
                    <div className = "row">
                        <div className = "card col-sm-12">
                            <div className = "card-body">
                                <div className = "row">
                                    <label> <strong>Descrição:</strong> </label>
                                    <div>&nbsp;{ this.state.conta.descricao }</div>
                                </div>
                                <div className = "row">
                                    <label> <strong>Categoria:</strong> </label>
                                    <div>&nbsp;{ this.state.conta.categoria }</div>
                                </div>
                                <div className = "row">
                                    <label> <strong>Valor:</strong> </label>
                                    <div>&nbsp;{ this.state.conta.valor }</div>
                                </div>
                                <div className = "row">
                                    <label> <strong>Data:</strong> </label>
                                    <div>&nbsp;{ this.dateFormat(this.state.conta.data) }</div>
                                </div>
                                <div className = "row">
                                    <label> <strong>Tipo:</strong> </label>
                                    <div>&nbsp;{ this.state.conta.tipo === 1 ? 'Receita' : 'Despesa' }</div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewContaComponent
