import { useContext, useState } from 'react';
import './styles.css'
import { CredentialsDTO } from '../../../components/models/auth';

import * as authService from '../../../services/auth-service';
import { useNavigate } from 'react-router-dom';
import { ContextToken } from '../../../utils/context-token';

export default function Login() {

  const { setContextTokenPayload } = useContext(ContextToken);

  const navigate = useNavigate();

  const [formData, setFormData] = useState<CredentialsDTO>({
    username: '',
    password: ''
  })

  function handleSubmit(event: any) {
    event.preventDefault();
    authService.loginRequest(formData)
      .then(response => {
        authService.saveAcessToken(response.data.access_token);
        setContextTokenPayload(authService.getAcessTokenPayload());

        navigate("/cart")
      })
      .catch(error => {
        console.log("Erro no Login", error);
      })


  }

  function handleInputChange(event: any) {
    const value = event.target.value;
    const name = event.target.name;
    setFormData({ ...formData, [name]: value })

  }


  return (
    <main>
      <section id="login-section" className="dsc-container">
        <div className="dsc-login-form-container" >
          <form className="dsc-card dsc-form" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div className="dsc-form-controls-container">
              <div>
                <input
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="dsc-form-control"
                  type="text"
                  placeholder="Email" />
                <div className="dsc-form-error"></div>
              </div>
              <div>
                <input
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="dsc-form-control"
                  type="password"
                  placeholder="Senha" />
              </div>
            </div>

            <div className="dsc-login-form-buttons dsc-mt20">
              <button type="submit" className="dsc-btn dsc-btn-blue">Entrar</button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}