import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Icon, Divider } from 'antd';

const ClientsList = ({ data, isFetching, confirmDelete }) => {
  const columns = [
    {
      title: 'NIT',
      dataIndex: 'nit',
      key: 'nit',
      sorter: (a, b) => (a.nit < b.nit ? -1 : a.nit > b.nit ? 1 : 0)
    },
    {
      title: 'Full name',
      dataIndex: 'fullname',
      key: 'fullname',
      sorter: (a, b) =>
        a.fullname < b.fullname ? -1 : a.fullname > b.fullname ? 1 : 0
    },
    {
      title: 'Credit limit',
      dataIndex: 'credit_limit',
      key: 'credit_limit',
      sorter: (a, b) =>
        a.credit_limit < b.credit_limit
          ? -1
          : a.credit_limit > b.credit_limit
          ? 1
          : 0
    },
    {
      title: 'Available credit',
      dataIndex: 'available_credit',
      key: 'available_credit',
      sorter: (a, b) =>
        a.available_credit < b.available_credit
          ? -1
          : a.available_credit > b.available_credit
          ? 1
          : 0
    },
    {
      title: 'Action',
      key: 'action',
      width: 80,
      render: (text, record) => (
        <span>
          <Link to={`/app/clients/${record.id}/edit`}>
            <Icon type='edit' />
          </Link>
          <Divider type='vertical' />
          <span
            style={{ cursor: 'pointer' }}
            onClick={() => confirmDelete(record.id, record.fullname)}
          >
            <Icon type='delete' />
          </span>
        </span>
      )
    }
  ];

  return (
    <Table
      rowKey={data => data.id}
      loading={isFetching}
      columns={columns}
      dataSource={data}
      size='middle'
      pagination={{
        pageSize: 20,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '15', '20'],
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
      }}
    />
  );
};

ClientsList.propTypes = {
  data: PropTypes.array.isRequired
};

export default ClientsList;
