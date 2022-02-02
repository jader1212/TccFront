import React, { Component } from 'react'
import ContaService from '../services/ContaService';

class UpdateContaComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            descricao: '',
            categoria: '',
            valor: '',
            data: '',
            tipo: ''
        }

        this.changeDescricaoHandler = this.changeDescricaoHandler.bind(this);
        this.changeCategoriaHandler = this.changeCategoriaHandler.bind(this);
        this.changeValorHandler = this.changeValorHandler.bind(this);
        this.changeDataHandler = this.changeDataHandler.bind(this);
        this.changeTipoHandler = this.changeTipoHandler.bind(this);

        this.updateConta = this.updateConta.bind(this);
    }

    componentDidMount(){
        ContaService.getContaById(this.state.id).then( (res) =>{
            let conta = res.data;
            this.setState({
                descricao: conta.descricao,
                categoria: conta.categoria,
                valor: conta.valor,
                data: conta.data,
                tipo: conta.tipo
            });
        });
    }

    updateConta = (e) => {
        e.preventDefault();

        let conta = {
            descricao: this.state.descricao, 
            categoria: this.state.categoria, 
            valor: this.state.valor,
            data: this.state.data,
            tipo: this.state.tipo
        };

        console.log('conta => ' + JSON.stringify(conta));
        console.log('id => ' + JSON.stringify(this.state.id));
        
        ContaService.updateConta(conta, this.state.id).then( res => {
            this.props.history.push('/contas');
        });
    }
    
    changeDescricaoHandler = (event) => {
        this.setState({descricao: event.target.value});
    }

    changeCategoriaHandler = (event) => {
        this.setState({categoria: event.target.value});
    }

    changeValorHandler = (event) => {
        this.setState({valor: event.target.value});
    }

    changeDataHandler = (event) => {
        this.setState({data: event.target.value});
    }

    changeTipoHandler = (event) => {
        this.setState({tipo: event.target.value});
    }

    cancel(){
        this.props.history.push('/contas');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Atualizar Conta</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Descricao: </label>
                                            <input placeholder="Descrição" name="descricao" className="form-control" value={this.state.descricao} onChange={this.changeDescricaoHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Categoria: </label>
                                            <input placeholder="Categoria" name="categoria" className="form-control" value={this.state.categoria} onChange={this.changeCategoriaHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Valor: </label>
                                            <input placeholder="Valor" name="valor" className="form-control" value={this.state.valor} onChange={this.changeValorHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> data: </label>
                                            <input placeholder="20/10/2021" name="data" className="form-control" value={this.state.data} onChange={this.changeDataHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Tipo: </label>
                                            <select name="tipo" className="form-control" value={this.state.tipo} onChange={this.changeTipoHandler}>
                                                <option value="">Selecione</option>
                                                <option value="1">Receita</option>
                                                <option value="0">Despesa</option>
                                            </select>
                                        </div> 

                                        <button className="btn btn-success" onClick={this.updateConta}>Salvar</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancelar</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default UpdateContaComponent
