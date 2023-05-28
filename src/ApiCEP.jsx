import axios from "axios";
import { useState } from "react";
import { Input, InputGroup, InputGroupText } from "reactstrap";

const ApiCEP = () => {

    const [cep, setCep] = useState([]);
    
    const getNumberCep = async (event) => {
        
        if(event.code === 'Enter' || event.keyCode === 13) {
            event.preventDefault();
            
            let cepValue = event.target.value;
            
            if(cepValue.length < 8 || cepValue.length > 8){
                alert('O CEP tem 8 caracteres. Voce digitou ' + cepValue.length);
                return false;
            } else {
                try {
                    const response = await axios.get(`https://viacep.com.br/ws/${cepValue}/json/`);
                    const data = response.data;
                    setCep([data]);
                } catch (error) {
                    console.error("Erro: ", error);
                } 
            }

        }
    }
     

    return (
        <div className="container">
            <div className="row">
                <div><h1>Buscar CEP</h1></div>
                <InputGroup>
                    <Input maxLength={8} autoFocus autoComplete="off" placeholder="Digite o número do CEP para buscar" id="cep" name="cep" onKeyUp={getNumberCep}/>
                    <InputGroupText>
                        tecle ENTER p/ aplicar
                    </InputGroupText>
                </InputGroup>
            </div>
            <div style={{ marginTop: '20px' }}>
                <p>
                    <strong>
                        Resultado
                    </strong>
                </p>
                <div className="result" style={{  backgroundColor: '#ebebeb', border: '1px solid #cacaca', height: '290px', borderRadius: '5px', marginTop: '10px', padding: '10px' }}>
                    {
                        cep.length === 0 ? (<>Carregando...</>) : (
                            cep.map((data, key) => {
                                return (
                                    <div style={{fontSize: '20px'}} key={key}>
                                        {
                                            data.cep ?
                                                <>
                                                <p>CEP: {data.cep}</p>
                                                <p>Logradouro: {data.logradouro}</p>
                                                <p>Bairro: {data.bairro}</p>
                                                <p>Cidade: {data.localidade}</p>
                                                <p>Estado: {data.uf}</p>
                                                <p>DDD: {data.ddd}</p>
                                                </>
                                            : (<i>Este CEP não existe.</i>)
                                        }
                                    </div>
                                )
                            })
                        )
                    }
                    {/* {loading ? (
                    <>Carregando...</>
                    ) : (
                    cep.length === 0 ? (
                        <>Digite um CEP e pressione Enter</>
                    ) : (
                        cep.map((data, key) => (
                        <div style={{ fontSize: '20px' }} key={key}>
                            <p>CEP: {data.cep}</p>
                            <p>Logradouro: {data.logradouro}</p>
                            <p>Bairro: {data.bairro}</p>
                            <p>Cidade: {data.localidade}</p>
                            <p>Estado: {data.uf}</p>
                            <p>DDD: {data.ddd}</p>
                        </div>
                        ))
                    )
                    )} */}
                </div>
            </div>
                
            <footer className="text-center" style={{marginTop: '20px'}}>
                Feito por &nbsp; 
                <a href="https://github.com/anabeatrizdsmorais">
                    @anabeatrizdsmorais
                </a>
            </footer>
        </div>
    )
}

export default ApiCEP;