import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import TimelineIcon from '@mui/icons-material/Timeline';
import LogoutIcon from '@mui/icons-material/Logout';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

export const SidebarData = [
    {
        title: "ホーム",
        icon: <HomeIcon/>,
        link: "/home"
    },
    {
        title: "メンバー",
        icon: <PeopleAltIcon/>,
        link: "/member"
    },
    {
        title: "タイムライン",
        icon: <TimelineIcon/>,
        link: "/timeline"
    },
    {
        title: "貢献を送る",
        icon: <CardGiftcardIcon/>,
        link: "/contribution"
    },
    {
        title: "アカウント編集",
        icon: <AccountBoxIcon/>,
        link: "/accountedit"
    },
    {
        title: "ログアウト",
        icon: <LogoutIcon/>,
        link: "/login"
    }
]
