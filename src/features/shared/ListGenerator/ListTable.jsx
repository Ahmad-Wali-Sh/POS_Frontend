import { Table } from 'antd'

function ListTable({data, tabChange, setEditObject, columns}) {

    return (
        <Table rowKey='id' rowHoverable onRow={(record) => {
            return {
                onClick: () => {
                    tabChange('edit')
                    setEditObject(record)
                }
            }
        }} columns={columns}  dataSource={data} scroll={{ y: 350 }} size='medium' sticky />
    )
}

export default ListTable