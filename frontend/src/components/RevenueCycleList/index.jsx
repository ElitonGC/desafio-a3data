
import { Table, Button, Popconfirm, message, Tag as AntTag, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import api from '../../api';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const stageLabels = {
   PRE_AUTH: 'Pré-Autorização',
   ATTENDANCE: 'Atendimento',
   BILLING: 'Faturamento',
   ADJUDICATION: 'Adjudicação',
   PAYMENT: 'Pagamento',
};

const claimStatusLabels = {
   OPEN: 'Aberto',
   DENIED: 'Negado',
   APPROVED: 'Aprovado',
   PAID: 'Pago',
   CANCELLED: 'Cancelado',
};

const stageColors = {
   PRE_AUTH: '#faad14',
   ATTENDANCE: '#722ed1',
   BILLING: '#1890ff',
   ADJUDICATION: '#13c2c2',
   PAYMENT: '#52c41a',
};

const statusColors = {
   OPEN: '#1890ff',
   DENIED: '#ff4d4f',
   APPROVED: '#52c41a',
   PAID: '#13c2c2',
   CANCELLED: '#bfbfbf',
};

const Tag = styled(AntTag)`
   font-weight: 500;
   font-size: 13px;
   padding: 0 12px;
   border-radius: 8px !important;
`;

const RevenueCycleList = forwardRef(({ token, onEdit, onAdd }, ref) => {
   const [revenueCycles, setRevenueCycles] = useState([]);
   const [loading, setLoading] = useState(false);

   const fetchRevenueCycles = () => {
      setLoading(true);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      api.get('/revenue-cycle')
         .then(res => setRevenueCycles(res.data))
         .finally(() => setLoading(false));
   };

   useImperativeHandle(ref, () => ({
      fetchRevenueCycles,
   }));

   useEffect(() => {
      fetchRevenueCycles();
      // eslint-disable-next-line
   }, [ref]);

   useEffect(() => {
      fetchRevenueCycles();
      // eslint-disable-next-line
   }, [token]);

   const handleDelete = async (id) => {
      setLoading(true);
      try {
         await api.delete(`/revenue-cycle/${id}`);
         message.success('Ciclo removido!');
         setRevenueCycles(revenueCycles.filter(cycle => cycle.id !== id));
      } catch {
         message.error('Erro ao remover ciclo');
      } finally {
         setLoading(false);
      }
   };

   const columns = [
      { title: 'Paciente', dataIndex: 'patientId' },
      { title: 'Pagador', dataIndex: 'payer' },
      { title: 'Procedimento', dataIndex: 'procedureCode' },
      { title: 'Valor', dataIndex: 'amount', render: (v) => `R$ ${Number(v).toFixed(2)}` },
         {
             title: 'Etapa',
             dataIndex: 'stage',
             render: (stage) => (
                <Tag style={{ background: stageColors[stage], color: '#fff', border: 0 }}>
                   {stageLabels[stage] || stage}
                </Tag>
             ),
         },
         {
             title: 'Status',
             dataIndex: 'claimStatus',
             render: (status) => (
                <Tag style={{ background: statusColors[status], color: '#fff', border: 0 }}>
                   {claimStatusLabels[status] || status}
                </Tag>
             ),
         },
      {
         title: 'Vencimento',
         dataIndex: 'dueDate',
         render: (date) => date ? dayjs.utc(date).format('DD/MM/YYYY') : '',
      },
      {
         title: 'Pago em',
         dataIndex: 'paidDate',
         render: (date) => date ? dayjs.utc(date).format('DD/MM/YYYY') : '-',
      },
         {
             title: 'Notas',
             dataIndex: 'notes',
                render: (notes) => notes ? (
                   <Tooltip title={notes} placement="topLeft">
                      <InfoCircleOutlined style={{ color: '#1890ff', fontSize: 18, cursor: 'pointer' }} />
                   </Tooltip>
                ) : '-',
         },
      {
         title: 'Ações',
         key: 'actions',
         render: (_, record) => (
            <>
               <Button
                  type="link"
                  icon={<EditOutlined />}
                  onClick={() => onEdit && onEdit(record)}
                  style={{ marginRight: 8 }}
               />
               <Popconfirm
                  title="Tem certeza que deseja remover?"
                  onConfirm={() => handleDelete(record.id)}
                  okText="Sim"
                  cancelText="Não"
               >
                  <Button type="link" danger icon={<DeleteOutlined />} />
               </Popconfirm>
            </>
         ),
      },
   ];

   // Styled Components
   const Container = styled.div`
      max-width: 1100px;
      margin: 32px auto;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 2px 16px 0 rgba(0,0,0,0.07);
      padding: 32px 24px;
   `;
   const AddButtonWrapper = styled.div`
      display: flex;
      justify-content: flex-end;
      margin-bottom: 16px;
   `;

   return (
      <Container>
         <AddButtonWrapper>
            <Button
               type="primary"
               icon={<PlusOutlined />}
               onClick={onAdd}
               shape="circle"
               title="Novo Ciclo"
            />
         </AddButtonWrapper>
         <Table dataSource={revenueCycles} columns={columns} rowKey="id" loading={loading} />
      </Container>
   );
});

export default RevenueCycleList;