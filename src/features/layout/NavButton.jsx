import { Button, Tooltip } from 'antd'
import { useLocation, useNavigate } from 'react-router'

function NavButton({ title, icon, isDanger = false, link }) {
    const navigate = useNavigate()
    const { pathname } = useLocation()


    return (
        <Tooltip title={title} placement="right">
            <Button onClick={() => {
                navigate(link)
            }} shape="sqaure" size="large" type={pathname == link || pathname == '/' && title == 'POS' ? 'primary' : 'link'} danger={isDanger}>
                {icon}
            </Button>
        </Tooltip>
    )
}

export default NavButton