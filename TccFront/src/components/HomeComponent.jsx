import React, { Component } from 'react'
import ContaService from '../services/ContaService'

class HomeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            conta: {}
        }

        this.showRelatorio = this.showRelatorio.bind(this);
        this.showListar = this.showListar.bind(this);
        this.showInserir = this.showInserir.bind(this);
    }

    componentDidMount(){
        ContaService.getContaTotal().then( res => {
            this.setState({conta: res.data});
        })
    }

    showRelatorio(){
        this.props.history.push('/show-relatorio');
    }

    showListar(){
        this.props.history.push('/contas');
    }

    showInserir(){
        this.props.history.push('/add-conta/_add');
    }

    render() {
        return (
            <div>
                <div className="row mt-5">
                    <div className="col-sm-6">
                        <h2 className="row text-let">Home</h2>
                    </div>
                    <div className="col-sm-6">
                        <div className="row float-right">
                            <button className="btn btn-secondary " onClick={this.showRelatorio}> Relatório</button>  &nbsp;&nbsp;
                            <button className="btn btn-warning text-white" onClick={this.showListar}> Listar</button>  &nbsp;&nbsp;
                            <button className="btn btn-success " onClick={this.showInserir}> Inserir</button>
                        </div>
                    </div>    
                    <div className="col-sm-12">
                        <hr className="row"/>
                    </div>    
                </div>

                <div className="row mt-5">
                    {/* receitas */}
                    <div className="col-sm-6">
                        <div className="card text-white bg-success mb-3" >
                            <div className="card-header"><h5>Receitas</h5></div>
                            <div className="card-body">
                                <h5 className="card-title">R$ { this.state.conta.receita }</h5>
                            </div>
                        </div>
                    </div>
                    {/* despesas */}
                    <div className="col-sm-6">
                        <div className="card text-white bg-danger mb-3" >
                            <div className="card-header"><h5>Despesas</h5></div>
                            <div className="card-body">
                                <h5 className="card-title">R$ { this.state.conta.despesa }</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomeComponent
