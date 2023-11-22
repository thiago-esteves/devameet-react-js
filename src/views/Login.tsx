import { useState } from 'react';
import logo from '../assets/images/Logo.svg';
import loginIcon from '../assets/images/mail.svg';
import passWordIcon from '../assets/images/key.svg';
import { PublicInput } from '../components/general/PublicInput';
import { LoginServices } from '../services/LoginServices';
import {Link, useSearchParams} from 'react-router-dom';


const loginServices = new LoginServices();


export const Login = () => {

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [searchParams] = useSearchParams();
    const success = searchParams.get('success');

    const doLogin = async () => {
        try{
            setError('');

            if(!login || login.trim().length < 5 
                || !password || password.trim().length <4){
                return  setError('Favor preencher os campos corretamente.');
                }

                setLoading(true);
                await loginServices.login({login, password});
                setLoading(false);
           

        }catch(e:any){
          console.log('Erro ao efetuar login :',e);
          setLoading(false);
          if(e?.response?.data?.message){
            return setError(e?.response?.data?.message);
          }
            return setError('Erro ao efetuar login, tente novamente');
        }

    }

    return (
        <div className="container-public">
            <img src={logo} alt='Logo devameet' className='logo' />
            <form>
                {error && <p className='error'>{error}</p>}
                {success && <p className='success'>Cadastro efetuado com sucesso, faça seu login.</p>}
                
                <PublicInput icon={loginIcon} alt='Email' name='email'
                    type='text' modelValue={login} setValue={setLogin} />

                <PublicInput icon={passWordIcon} alt='Senha' name='Senha'
                    type='text' modelValue={password} setValue={setPassword} />


                <button type='button' onClick={doLogin} disabled={loading}>{loading ?'...Carregando':'Login'}</button>
                <div className='link'>
                    <p >Não possuii uma conta?</p>
                    <Link to='/register'>Faça seu cadastro agora!</Link>
                </div>

            </form>

        </div>
    );
}
