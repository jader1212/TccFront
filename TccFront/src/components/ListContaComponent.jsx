import React, { Component } from 'react'
import ContaService from '../services/ContaService'
import moment from 'moment';
  
class ListContaComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            conta: []
        }
        
        this.showHome = this.showHome.bind(this);
        this.addConta = this.addConta.bind(this);
        this.editConta = this.editConta.bind(this);
        this.deleteConta = this.deleteConta.bind(this);

        this.changeTipoHandler = this.changeTipoHandler.bind(this);
    }

    deleteConta(id){
        ContaService.deleteConta(id).then( res => {
            this.setState({conta: this.state.conta.filter(conta => conta.id !== id)});
        });
    }
    viewConta(id){
        this.props.history.push(`/view-conta/${id}`);
    }
    editConta(id){
        this.props.history.push(`/add-conta/${id}`);
    }

    componentDidMount(){
        ContaService.getContas().then((res) => {
            this.setState({ conta: res.data});
        });
    }

    showHome(){
        this.props.history.push('/show-home');
    }

    addConta(){
        this.props.history.push('/add-conta/_add');
    }

    changeTipoHandler = (event) => {
        //this.setState({tipo: event.target.value});
        //console.log(event.target.value)

        if(event.target.value) {
            ContaService.getContaByType(event.target.value).then( res => {
                this.setState({conta: res.data});
            })
        } else {
            ContaService.getContas().then((res) => {
                this.setState({ conta: res.data});
            });
        }
    }

    dateFormat(dt) {
        return moment(dt).format("DD/MM/YYYY");
    }

    render() {
        return (
            <div>
                <div className="row mt-5">
                    <div className="col-sm-6">
                        <h2 className="row text-let">Listagem</h2>
                    </div>
                    <div className="col-sm-6">
                        <div className="row float-right">
                            <button className="btn btn-info " onClick={this.showHome}> Home</button>  &nbsp;&nbsp;
                            <button className="btn btn-success " onClick={this.addConta}> Inserir</button>
                        </div>
                    </div>    
                    <div className="col-sm-12">
                        <hr className="row"/>
                    </div>    
                </div>

                <div className="row mt-5">
                    <div className = "form-group">
                        <label> Tipo de entrada: </label>
                        <select name="tipo" className="form-control" value={this.state.tipo} onChange={this.changeTipoHandler}>
                            <option value="">Todos</option>
                            <option value="1">Receita</option>
                            <option value="0">Despesa</option>
                        </select>
                    </div>
                </div>

                <div className="row mt-5">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr className="text-center">
                                    <th> Descrição</th>
                                    <th> Categoria</th>
                                    <th> Valor</th>
                                    <th> Data</th>
                                    <th> Tipo</th>
                                    <th> Ação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.conta.map(
                                        conta => 
                                        <tr key = {conta.id} className="text-center">
                                             <td> {conta.descricao} </td>   
                                             <td> {conta.categoria}</td>
                                             <td> {conta.valor}</td>
                                             <td> {this.dateFormat(conta.data)}</td>
                                             <td> {conta.tipo === 1 ? <span className="text-success">Receita</span> : <span className="text-danger">Despesa</span>}</td>
                                             <td>
                                                 <button onClick={ () => this.editConta(conta.id)} className="btn btn-info">Editar</button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteConta(conta.id)} className="btn btn-danger">Apagar</button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewConta(conta.id)} className="btn btn-warning">Detalhes</button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                </div>

            </div>
        )
    }
}

export default ListContaComponent
