import { Form, Input, Button, message } from 'antd';
import api from '../../api';
import { Link } from 'react-router';
import styled from 'styled-components';

const FormWrapper = styled.div`
   max-width: 400px;
   margin: 32px auto;
   padding: 32px 24px;
   background: #fff;
   border-radius: 12px;
   box-shadow: 0 2px 16px 0 rgba(0,0,0,0.07);
`;

const Actions = styled.div`
   display: flex;
   justify-content: flex-end;
   gap: 8px;
`;

const RegisterLink = styled.div`
   margin-top: 16px;
   text-align: center;
`;

export default function LoginForm({ onLogin, onCancel }) {
   const [form] = Form.useForm();

   const onFinish = async (values) => {
      try {
         const res = await api.post('/auth/login', {
            email: values.email,
            password: values.password,
         });
         if (![200, 201].includes(res.status)) throw new Error('Login failed');
         onLogin(res.data.access_token);
      } catch {
         message.error('E-mail ou senha inválidos');
      }
   };

   return (
      <FormWrapper>
         <Form form={form} onFinish={onFinish} layout="vertical">
            <Form.Item
               name="email"
               label="E-mail"
               rules={[
                  { required: true, message: 'E-mail é obrigatório' },
                  { type: 'email', message: 'Digite um e-mail válido' },
               ]}
            >
               <Input autoComplete="username" placeholder="seu@email.com" />
            </Form.Item>
            <Form.Item name="password" label="Senha" rules={[{ required: true }]}> 
               <Input.Password autoComplete="current-password" />
            </Form.Item>
            <Actions>
               {onCancel && (
                  <Button onClick={onCancel} style={{ minWidth: 100 }}>
                     Cancelar
                  </Button>
               )}
               <Button type="primary" htmlType="submit" style={{ minWidth: 100 }}>
                  Entrar
               </Button>
            </Actions>
         </Form>
         <RegisterLink>
            <span>Ainda não tem conta? </span>
            <Link to="/register">Cadastre-se</Link>
         </RegisterLink>
      </FormWrapper>
   );
}