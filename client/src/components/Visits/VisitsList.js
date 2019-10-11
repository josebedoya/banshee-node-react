import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Icon, Divider } from 'antd';
import moment from 'moment';

const VisitsList = ({ data, isFetching, confirmDelete }) => {
  const columns = [
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      defaultSortOrder: 'descend',
      sorter: (a, b) =>
        a.createdAt < b.createdAt ? -1 : a.createdAt > b.createdAt ? 1 : 0,
      render: text => {
        return (
          <div>
            {moment(text).format('DD-MM-YYYY')}
            <span style={{ display: `block`, fontSize: `12px` }}>
              ({moment(text).fromNow()})
            </span>
          </div>
        );
      }
    },
    {
      title: 'Net Price',
      dataIndex: 'net',
      key: 'net'
    },
    {
      title: 'Visit Total',
      dataIndex: 'visit_total',
      key: 'visit_total'
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

VisitsList.propTypes = {
  data: PropTypes.array.isRequired
};

export default VisitsList;
