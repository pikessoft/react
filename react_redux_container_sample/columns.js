/**
 *
 * AniListContentsColumns
 *
 */

import React from 'react';
import { Tooltip, Modal } from 'antd';
import CustomIcon from 'components/CustomIcon';
import { applySorters } from 'utils/sorters';

const { confirm } = Modal;

export const Columns = parent => {
  const columns = [
    {
      title: 'Value',
      dataIndex: 'list_value',
      key: 'list_value',
      width: '25%',
    },
    {
      title: 'Effective',
      dataIndex: 'effective_date',
      key: 'effective_date',
      width: '25%',
    },
    {
      title: 'Expires',
      dataIndex: 'expiry_date',
      key: 'expiry_date',
      width: '25%',
      render: value => (value && value) || '--',
    },
    {
      title: 'Action',
      key: 'delete',
      width: '25%',
      align: 'center',
      render: (text, record) => (
        <span align="middle">
          <Tooltip title="Delete">
            {' '}
            &nbsp; &nbsp;
            <CustomIcon
              loading={record.deleteLoading}
              type="delete"
              onClick={() =>
                confirm({
                  title: 'Are you sure you want to delete this entry?',
                  okType: 'danger',
                  okText: 'Yes',
                  cancelText: 'No',
                  onOk() {
                    parent.props.deleteRequest({
                      id: record.id,
                      type: parent.props.type,
                    });
                  },
                })
              }
            />
          </Tooltip>
        </span>
      ),
    },
  ];
  return applySorters(columns, {
    effective_date: 'effective_date_original',
    expiry_date: 'expiry_date_original',
  });
};
