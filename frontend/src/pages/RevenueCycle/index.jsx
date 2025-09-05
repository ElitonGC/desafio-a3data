import styled from 'styled-components';
import { useState, useRef } from 'react';
import RevenueCycleList from '../../components/RevenueCycleList';
import RevenueCycleForm from '../../components/RevenueCycleForm';
import { Modal, Layout } from 'antd';
import { createGlobalStyle } from 'styled-components';

const FormSpacingStyle = createGlobalStyle`
   .ant-modal .ant-form-item {
      margin-bottom: 12px;
   }
   .ant-modal .ant-modal-content {
      max-height: none !important;
   }
   .ant-modal-body {
      max-height: none !important;
      overflow: visible !important;
   }
`;
import { PoweroffOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;

const StyledHeader = styled(Header)`
   background: #fff !important;
   display: flex;
   justify-content: space-between;
   align-items: center;
   box-shadow: 0 2px 8px #f0f1f2;
   padding: 0 32px;
`;

const StyledContent = styled(Content)`
   max-width: 1400px;
   margin: auto;
   width: 100%;
`;

const LogoutButton = styled.button`
   padding: 8px;
   background: #f5222d;
   color: #fff;
   border: none;
   border-radius: 50%;
   cursor: pointer;
   display: flex;
   align-items: center;
   justify-content: center;
   font-size: 20px;
`;

export default function RevenueCyclesPage({ token, onLogout }) {
   const [editingRevenueCycle, setEditingRevenueCycle] = useState(null);
   const [modalVisible, setModalVisible] = useState(false);
   const RevenueCycleListRef = useRef();

   const handleEdit = (revenueCycle) => {
      setEditingRevenueCycle(revenueCycle);
      setModalVisible(true);
   };

   const handleAdd = () => {
      setEditingRevenueCycle(false);
      setModalVisible(true);
   };

   const handleCloseModal = () => {
      setEditingRevenueCycle(null);
      setModalVisible(false);
   };

   // Função para atualizar a lista de Ciclo de Receitas
   const refreshRevenueCycles = () => {
      if (RevenueCycleListRef.current && RevenueCycleListRef.current.fetchRevenueCycles) {
         RevenueCycleListRef.current.fetchRevenueCycles();
      }
   };

   return (
      <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
         <StyledHeader>
            <h2 style={{ margin: 0 }}>Ciclo de Receiras</h2>
            <LogoutButton onClick={onLogout} title="Logoff">
               <PoweroffOutlined />
            </LogoutButton>
         </StyledHeader>
         <StyledContent>
            <RevenueCycleList ref={RevenueCycleListRef} token={token} onEdit={handleEdit} onAdd={handleAdd} />
            <FormSpacingStyle />
            <FormSpacingStyle />
            <Modal
               open={modalVisible}
               onCancel={handleCloseModal}
               footer={null}
               destroyOnClose
               title={editingRevenueCycle ? "Editar Ciclo de Receira" : "Novo Ciclo de Receira"}
               width={700}
               style={{ top: 40 }}
               bodyStyle={{ maxHeight: 'none', overflow: 'visible', paddingBottom: 0 }}
            >
               {editingRevenueCycle && (
                  <RevenueCycleForm
                     initialValues={editingRevenueCycle}
                     onSuccess={() => {
                        handleCloseModal();
                        refreshRevenueCycles();
                     }}
                     isEdit
                     token={token}
                     onCancel={handleCloseModal}
                  />
               )}
               {!editingRevenueCycle && (
                  <RevenueCycleForm
                     onSuccess={() => {
                        handleCloseModal();
                        refreshRevenueCycles();
                     }}
                     token={token}
                     onCancel={handleCloseModal}
                  />
               )}
            </Modal>
         </StyledContent>
      </Layout>
   );
}