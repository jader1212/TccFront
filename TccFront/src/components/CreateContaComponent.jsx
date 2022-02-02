import React, { Component } from 'react'
import ContaService from '../services/ContaService';
// import dateFormat from 'dateformat';

class CreateContaComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            descricao: '',
            categoria: '',
            valor: '',
            data: '',
            tipo: ''
        }
        
        this.showHome = this.showHome.bind(this);
        this.showListar = this.showListar.bind(this);

        this.changeDescricaoHandler = this.changeDescricaoHandler.bind(this);
        this.changeCategoriaHandler = this.changeCategoriaHandler.bind(this);
        this.changeValorHandler = this.changeValorHandler.bind(this);
        this.changeDataHandler = this.changeDataHandler.bind(this);
        this.changeTipoHandler = this.changeTipoHandler.bind(this);

        this.saveOrUpdateConta = this.saveOrUpdateConta.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
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
    }
    saveOrUpdateConta = (e) => {
        e.preventDefault();
        
        let conta = {
            id: '',
            descricao: this.state.descricao, 
            categoria: this.state.categoria, 
            valor: this.state.valor,
            data: this.state.data, //dateFormat(data.value, 'yyyy-mm-dd')
            tipo: this.state.tipo
        };
        //console.log(dateFormat(event.target.value, 'yyyy-mm-dd'))
        console.log('conta => ' + JSON.stringify(conta));

        // step 5
        if(this.state.id === '_add'){
            ContaService.createConta(conta).then(res =>{
                this.props.history.push('/contas');
            });
        }else{
            ContaService.updateConta(conta, this.state.id).then( res => {
                this.props.history.push('/contas');
            });
        }
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

    getTitle(){
        if(this.state.id === '_add'){
            return <h2 className="row text-left">Inserir</h2>
        }else{
            return <h2 className="row text-left">Atualizar</h2>
        }
    }

    showHome(){
        this.props.history.push('/show-home');
    }

    showListar(){
        this.props.history.push('/contas');
    }

    render() {
        return (
            <div>
                <div className="row mt-5">
                    <div className="col-sm-6">
                        { this.getTitle() }
                    </div>
                    <div className="col-sm-6">
                        <div className="row float-right">
                            <button className="btn btn-info" onClick={this.showHome}> Home</button>  &nbsp;&nbsp;
                            <button className="btn btn-warning text-white" onClick={this.showListar}> Listar</button> 
                        </div>
                    </div>    
                    <div className="col-sm-12">
                        <hr className="row"/>
                    </div>    
                </div>

                <div className = "container mt-5">
                    <div className = "row">
                        <div className = "card col-sm-12">
                            <div className = "card-body col-sm-6">
                                <form>
                                    <div className = "form-group">
                                        <label> Tipo de entrada: </label>
                                        <select name="tipo" className="form-control" value={this.state.tipo} onChange={this.changeTipoHandler} required>
                                            <option value="">Selecione</option>
                                            <option value="1">Receita</option>
                                            <option value="0">Despesa</option>
                                        </select>
                                    </div>

                                    <div className = "form-group">
                                        <label> Descricao: </label>
                                        <input placeholder="Descrição" name="descricao" className="form-control" value={this.state.descricao} onChange={this.changeDescricaoHandler} required/>
                                    </div>
                                    <div className = "form-group">
                                        <label> Categoria: </label>
                                        <input placeholder="Categoria" name="categoria" className="form-control" value={this.state.categoria} onChange={this.changeCategoriaHandler} required/>
                                    </div>
                                    <div className = "form-group">
                                        <label> Valor: </label>
                                        <input type="number" min="0" step=".01" placeholder="0,00" name="valor" className="form-control" value={this.state.valor} onChange={this.changeValorHandler} required/>
                                    </div>
                                    <div className = "form-group">
                                        <label> data: </label>
                                        <input type="date" placeholder="20/11/2021" name="data" className="form-control" value={this.state.data} onChange={this.changeDataHandler} required/>
                                    </div>                                       

                                    <button className="btn btn-info" onClick={this.saveOrUpdateConta}>Salvar</button>
                                    {/* <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancelar</button> */}
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default CreateContaComponent
