import React, { Component } from 'react'
import ContaService from '../services/ContaService'

// get our fontawesome imports
import { faUserPlus } from "@fortawesome/free-solid-svg-icons"; //faUserPlus
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class LoginAddComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            showMsg: false
        }

        this.changeLoginHandler = this.changeLoginHandler.bind(this);
        this.changeSenhaHandler = this.changeSenhaHandler.bind(this);

        this.showLogin = this.showLogin.bind(this);
        this.salvar = this.salvar.bind(this);
    }

    componentDidMount(){

    }

    showLogin = (e) => {
        e.preventDefault();
        this.props.history.push('/');
    }

    salvar = (e) => {
        e.preventDefault();
        
        let params = {
            id: '',
            username: this.state.username, 
            password: this.state.password
        };

        //console.log('params => ' + JSON.stringify(params));
        ContaService.authRegister(params).then(res =>{
            if(res.data.username) {
                this.setState({ showMsg: true })        
            }
            // this.props.history.push('/');
            // console.log('acessa dashboard...');
        });
    }

    changeLoginHandler = (event) => {
        this.setState({username: event.target.value});
    }

    changeSenhaHandler = (event) => {
        this.setState({password: event.target.value});
    }

    render() {
        return (
            <div>
                <div className = "container mt-5">
                    <div className = "row col d-flex justify-content-center">
                        <div className = "card col-sm-5">
                            <div className = "card-body">
                                <div className="col d-flex justify-content-center">
                                    <form>
                                        <div className="justify-content-center">
                                            <div className="row justify-content-center">
                                                <FontAwesomeIcon icon={faUserPlus} size='2x' />
                                            </div>
                                            <div className="row justify-content-center mt-2">
                                                <h5>Cadastrar</h5>
                                            </div>
                                        </div>
                                        
                                        <div className = "form-group">
                                            <input type="text" placeholder="Login" name="login" className="form-control" value={this.state.login} onChange={this.changeLoginHandler} required/>
                                        </div>
                                        <div className = "form-group">
                                            <input type="password" placeholder="Senha" name="data" className="form-control" value={this.state.senha} onChange={this.changeSenhaHandler} required/>
                                        </div>            
                                        <button className="btn btn-info form-control" onClick={this.salvar}>Salvar</button>

                                        <p className="mt-2">
                                            <a href="/" onClick={this.showLogin}>Clique aqui para acessar!</a>
                                        </p>

                                        <div className="alert alert-success" style={{ display: (this.state.showMsg ? 'block' : 'none') }}>
                                            Acesso cadastrado com sucesso!
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginAddComponent
