import { Form, Input, Button, message } from 'antd';
import styled from 'styled-components';
import api from '../../api';
import { useEffect } from 'react';


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


export default function UserForm({ onSuccess, initialValues = {}, isEdit = false, token, onCancel }) {
   const [form] = Form.useForm();

   useEffect(() => {
      if (isEdit && initialValues) {
         form.setFieldsValue({
            ...initialValues,
            password: ''
         });
      }
      // eslint-disable-next-line
   }, [initialValues, isEdit]);

   const onFinish = async (values) => {
      try {
         let res;
         if (isEdit) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            if (values.password === "") delete values.password;
            res = await api.patch(`/users/${initialValues.id}`, values);
            if (![200, 201].includes(res.status)) throw new Error('Erro ao atualizar');
            message.success('Usuário atualizado!');
            onSuccess && onSuccess();
         } else {
            res = await api.post('/auth/signup', values);
            if (![200, 201].includes(res.status)) throw new Error('Erro ao cadastrar');
            message.success('Usuário cadastrado!');
            onSuccess && onSuccess(res.data?.access_token);
         }
      } catch {
         message.error(isEdit ? 'Erro ao atualizar usuário' : 'Erro ao cadastrar usuário');
      }
   };

   return (
      <FormWrapper>
         <Form
            form={form}
            onFinish={onFinish}
            layout="vertical"
            initialValues={{
               ...initialValues,
            }}
         >
            <Form.Item name="name" label="Nome" rules={[{ required: true }]}> 
               <Input />
            </Form.Item>
            <Form.Item
               name="email"
               label="E-mail"
               rules={[
                  {
                     type: 'email',
                     message: 'Digite um e-mail válido',
                  },
               ]}
            >
               <Input />
            </Form.Item>
            {/* CPF, birthDate, gender, placeOfBirth e nationality removidos do cadastro */}
                        <Form.Item
                           name="password"
                           label="Senha"
                           rules={isEdit ? [] : [{ required: true, min: 6 }]}
                           extra={isEdit ? 'Preencha apenas se desejar alterar a senha.' : ''}
                        >
                           <Input.Password />
                        </Form.Item>
                        <Actions>
                           {onCancel && (
                              <Button onClick={onCancel} style={{ minWidth: 100 }}>
                                 Cancelar
                              </Button>
                           )}
                           <Button type="primary" htmlType="submit" style={{ minWidth: 100 }}>
                              {isEdit ? 'Salvar' : 'Cadastrar'}
                           </Button>
                        </Actions>
         </Form>
      </FormWrapper>
   );
}