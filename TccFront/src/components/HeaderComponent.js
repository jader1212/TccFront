import React, { Component } from 'react'

class HeaderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showHideBtn: false
        }
    }

    render() {
        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                        <div className="col-sm-6">
                            <a href="http://localhost:3000" className="navbar-brand">FinControlle</a>
                        </div>
                    
                        <div className="col-sm-6 float-right" style={{ display: (this.state.showHideBtn ? 'block' : 'none') }}>
                            <a href="http://localhost:3000" className="btn btn-secondary float-right">Sair</a>
                        </div>
                    </nav>
                </header>
            </div>
        )
    }
}

export default HeaderComponent
