import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
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
    }
  ];

  return (
    <Table
      rowKey={data => data.id}
      loading={isFetching}
      expandedRowRender={record => (
        <div>
          <h5>Description</h5>
          <p style={{ margin: 0 }}>{record.description}</p>
        </div>
      )}
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
