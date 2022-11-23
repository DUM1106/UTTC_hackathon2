import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import TimelineIcon from '@mui/icons-material/Timeline';
import LogoutIcon from '@mui/icons-material/Logout';

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
        title: "ログイン画面",
        icon: <LogoutIcon/>,
        link: "/login"
    }
]
