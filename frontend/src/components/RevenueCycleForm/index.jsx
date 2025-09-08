import { Form, Input, Button, message, DatePicker, Select, Row, Col } from 'antd';
import api from '../../api';
import { useAuth } from '../../contexts/AuthContext';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useEffect } from 'react';
import styled from 'styled-components';

dayjs.extend(utc);

const stageOptions = [
   { label: 'Pré-Autorização', value: 'PRE_AUTH' },
   { label: 'Atendimento', value: 'ATTENDANCE' },
   { label: 'Faturamento', value: 'BILLING' },
   { label: 'Adjudicação', value: 'ADJUDICATION' },
   { label: 'Pagamento', value: 'PAYMENT' },
];
const claimStatusOptions = [
   { label: 'Aberto', value: 'OPEN' },
   { label: 'Negado', value: 'DENIED' },
   { label: 'Aprovado', value: 'APPROVED' },
   { label: 'Pago', value: 'PAID' },
   { label: 'Cancelado', value: 'CANCELLED' },
];

const FormWrapper = styled.div`
   width: 100%;
   margin: 32px auto;
   padding: 32px 24px;
   background: #fff;
   border-radius: 12px;
   box-shadow: 0 2px 16px 0 rgba(0,0,0,0.07);
`;


export default function RevenueCycleForm({ onSuccess, initialValues = {}, isEdit = false }) {
   const { user } = useAuth();
   const [form] = Form.useForm();

   useEffect(() => {
      if (isEdit && initialValues) {
         form.setFieldsValue({
            ...initialValues,
            dueDate: initialValues.dueDate ? dayjs.utc(initialValues.dueDate) : null,
            paidDate: initialValues.paidDate ? dayjs.utc(initialValues.paidDate) : null,
         });
      }
      // eslint-disable-next-line
   }, [initialValues, isEdit]);

   const onFinish = async (values) => {
      try {
         values.dueDate = values.dueDate ? values.dueDate.toISOString() : null;
         values.paidDate = values.paidDate ? values.paidDate.toISOString() : undefined;
         let res;
         if (user && user.token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
         }
         if (isEdit) {
            res = await api.put(`/revenue-cycle/${initialValues.id}`, values);
            if (![200, 201].includes(res.status)) throw new Error('Erro ao atualizar');
            message.success('Ciclo atualizado!');
            onSuccess && onSuccess();
         } else {
            res = await api.post('/revenue-cycle', values);
            if (![200, 201].includes(res.status)) throw new Error('Erro ao cadastrar');
            message.success('Ciclo cadastrado!');
            onSuccess && onSuccess();
         }
      } catch {
         message.error(isEdit ? 'Erro ao atualizar ciclo' : 'Erro ao cadastrar ciclo');
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
               dueDate: initialValues.dueDate ? dayjs.utc(initialValues.dueDate) : null,
               paidDate: initialValues.paidDate ? dayjs.utc(initialValues.paidDate) : null,
            }}
         >
            <Row gutter={16}>
               <Col span={12}>
                  <Form.Item name="patientId" label="ID do Paciente" rules={[{ required: true }]}>
                     <Input type="number" />
                  </Form.Item>
               </Col>
               <Col span={12}>
                  <Form.Item name="payer" label="Pagador" rules={[{ required: true }]}>
                     <Input />
                  </Form.Item>
               </Col>
            </Row>
            <Row gutter={16}>
               <Col span={12}>
                  <Form.Item name="procedureCode" label="Procedimento" rules={[{ required: true }]}>
                     <Input />
                  </Form.Item>
               </Col>
               <Col span={12}>
                  <Form.Item name="amount" label="Valor" rules={[{ required: true }]}>
                     <Input type="number" min={0} step={0.01} prefix="R$" />
                  </Form.Item>
               </Col>
            </Row>
            <Row gutter={16}>
               <Col span={12}>
                  <Form.Item name="stage" label="Etapa" rules={[{ required: true }]}>
                     <Select options={stageOptions} />
                  </Form.Item>
               </Col>
               <Col span={12}>
                  <Form.Item name="claimStatus" label="Status" rules={[{ required: true }]}>
                     <Select options={claimStatusOptions} />
                  </Form.Item>
               </Col>
            </Row>
            <Row gutter={16}>
               <Col span={12}>
                  <Form.Item name="dueDate" label="Data de Vencimento" rules={[{ required: true }]}>
                     <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
                  </Form.Item>
               </Col>
               <Col span={12}>
                  <Form.Item name="paidDate" label="Data de Pagamento">
                     <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
                  </Form.Item>
               </Col>
            </Row>
            <Form.Item name="notes" label="Notas">
               <Input.TextArea rows={3} />
            </Form.Item>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
               <Button type="primary" htmlType="submit" style={{ minWidth: 120 }}>
                  {isEdit ? 'Salvar' : 'Cadastrar'}
               </Button>
            </div>
         </Form>
      </FormWrapper>
   );
}