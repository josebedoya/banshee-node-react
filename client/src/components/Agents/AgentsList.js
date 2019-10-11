import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Icon, Divider } from 'antd';

const AgentsList = ({ data, isFetching, confirmDelete }) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0)
    },
    {
      title: 'Action',
      key: 'action',
      width: 80,
      render: (text, record) => (
        <span>
          <Link to={`/app/agents/${record.id}/edit`}>
            <Icon type='edit' />
          </Link>
          <Divider type='vertical' />
          <span
            style={{ cursor: 'pointer' }}
            onClick={() => confirmDelete(record.id, record.name)}
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

AgentsList.propTypes = {
  data: PropTypes.array.isRequired
};

export default AgentsList;
