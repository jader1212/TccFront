import React, { Component } from 'react';

import {
    BarChart,
    Bar,
    //Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ReferenceLine,
    ResponsiveContainer,
  } from 'recharts';
  
  //const data = [];
      
//import ContaService from '../services/ContaService'

class RelatorioComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            conta: {}
        }

        this.showHome = this.showHome.bind(this);
        this.showListar = this.showListar.bind(this);
        this.showInserir = this.showInserir.bind(this);

        this.changeTipoHandler = this.changeTipoHandler.bind(this);
    }

    componentDidMount(){
        this.showMes();
        // ContaService.getContaById(this.state.id).then( res => {
        //     this.setState({conta: res.data});
        // })
    }

    showHome(){
        this.props.history.push('/show-home');
    }

    showListar(){
        this.props.history.push('/contas');
    }

    showInserir(){
        this.props.history.push('/add-conta/_add');
    }

    changeTipoHandler = (event) => {
        //this.setState({tipo: event.target.value});
        //console.log(event.target.value)

        if(event.target.value === 'mes') {
            this.showMes();
            // ContaService.getContaByType(event.target.value).then( res => {
            //     this.setState({conta: res.data});
            // })
        } else {
            this.showAno();
            // ContaService.getContas().then((res) => {
            //     this.setState({ conta: res.data});
            // });
        }
    }

    showMes() {
        let data = [{
            name: 'Janeiro',
            receita: 10.00,
            despesa: -50.00,
          },
          {
            name: 'Fevereiro',
            receita: 20.0,
            despesa: -100.00,
          },
          {
            name: 'Março',
            receita: 65.0,
            despesa: -98.00,
          }];

        this.setState({total: data});  
    }

    showAno() {
        let data = [{
            name: '1999',
            receita: 300.00,
            despesa: -400.00,
          },
          {
            name: '2020',
            receita: 200.00,
            despesa: -80.00,
          },
          {
            name: '2021',
            receita: 250,
            despesa: -150,
          }];

        this.setState({total: data}); 
    }

    render() {
        return (
            <div>
                <div className="row mt-5">
                    <div className="col-sm-6">
                        <h2 className="row text-let">Relatório</h2>
                    </div>
                    <div className="col-sm-6">
                        <div className="row float-right">
                            <button className="btn btn-info " onClick={this.showHome}> Home</button>  &nbsp;&nbsp;
                            <button className="btn btn-warning text-white" onClick={this.showListar}> Listar</button>  &nbsp;&nbsp;
                            <button className="btn btn-success " onClick={this.showInserir}> Inserir</button>
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
                                <form>
                                    <div className = "form-group col-sm-2">
                                        <label> Tipo de gráfico: </label>
                                        <select name="tipo" className="form-control" value={this.state.tipo} onChange={this.changeTipoHandler}>
                                            <option value="mes">Mensal</option>
                                            <option value="ano">Anual</option>
                                        </select>
                                    </div>
                                </form>

                                <div className = "row mt-5">
                                    <ResponsiveContainer width="100%" height="100%" aspect={5.0 / 2.0}>
                                        <BarChart
                                            width={500}
                                            height={300}
                                            data={this.state.total}
                                            margin={{
                                                top: 5,
                                                right: 30,
                                                left: 20,
                                                bottom: 5,
                                            }}
                                            >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <ReferenceLine y={0} stroke="#000" />
                                            <Bar dataKey="receita" fill="#28A745" />
                                            <Bar dataKey="despesa" fill="#DC3545" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>                                
                            </div>
                        </div>
                    </div>
                </div>              
            </div>
        )
    }
}

export default RelatorioComponent
