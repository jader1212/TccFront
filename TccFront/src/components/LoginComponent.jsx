import React, { Component } from 'react'
import ContaService from '../services/ContaService'

// get our fontawesome imports
import { faUserCheck } from "@fortawesome/free-solid-svg-icons"; //faUserPlus
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class LoginComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            showMsg: false
        }

        this.changeLoginHandler = this.changeLoginHandler.bind(this);
        this.changeSenhaHandler = this.changeSenhaHandler.bind(this);

        this.showLoginAdd = this.showLoginAdd.bind(this);
        this.acessar = this.acessar.bind(this);
    }

    componentDidMount(){

    }

    showLoginAdd = (e) => {
        e.preventDefault();
        this.props.history.push('/login-add');
    }

    acessar = (e) => {
        e.preventDefault();
        
        let params = {
            username: this.state.username, 
            password: this.state.password
        };


        this.props.history.push('/show-home');
        
        //console.log('params => ' + JSON.stringify(params));
/*        ContaService.authLogin(params).then(res =>{
            if(res.data.token) {
                localStorage.setItem('token', res.data.token);
                this.props.history.push('/show-home');
                //let isBool = isAuthenticated();
                // this.setState({
                //     isAuthenticated: true
                // });
            }
        });*/
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
                                                <FontAwesomeIcon icon={faUserCheck} size='2x' />
                                            </div>
                                            <div className="row justify-content-center mt-2">
                                                <h5>Entrar</h5>
                                            </div>
                                        </div>
                                        
                                        <div className = "form-group">
                                            <input type="text" placeholder="Login" name="username" className="form-control" value={this.state.username} onChange={this.changeLoginHandler} required/>
                                        </div>
                                        <div className = "form-group">
                                            <input type="password" placeholder="Senha" name="password" className="form-control" value={this.state.password} onChange={this.changeSenhaHandler} required/>
                                        </div>            
                                        <button className="btn btn-info form-control" onClick={this.acessar}>Acessar</button>

                                        <p className="mt-2">
                                            <a href="login-add" onClick={this.showLoginAdd}>Clique aqui para cadastrar!</a>
                                        </p>

                                        <div className="alert alert-danger" style={{ display: (this.state.showMsg ? 'block' : 'none') }}>
                                            Login ou senha inválidos!
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

export default LoginComponent
