import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navdata = () => {
    const history = useNavigate();
    //state data
    const [isCoinAnalyzer, setIsCoinAnalyzer] = useState(false);
    const [isNewsMgt, setIsNewsMgt] = useState(false);
    const [iscurrentState, setIscurrentState] = useState('CoinAnalyzer');

    function updateIconSidebar(e) {
        if (e && e.target && e.target.getAttribute("subitems")) {
            const ul = document.getElementById("two-column-menu");
            const iconItems = ul.querySelectorAll(".nav-icon.active");
            let activeIconItems = [...iconItems];
            activeIconItems.forEach((item) => {
                item.classList.remove("active");
                var id = item.getAttribute("subitems");
                if (document.getElementById(id))
                    document.getElementById(id).classList.remove("show");
            });
        }
    }

    useEffect(() => {
        document.body.classList.remove('twocolumn-panel');
        if (iscurrentState !== 'CoinAnalyzer') {
            setIsCoinAnalyzer(false);
        }
        if (iscurrentState !== 'NewsMgt') {
            setIsNewsMgt(false);
        }
    }, [
        history,
        iscurrentState,
        isCoinAnalyzer,
        isNewsMgt
    ]);

    const menuItems = [
        {
            label: "Menu",
            isHeader: true,
        },
        {
            id: "coinanalyzer",
            label: "Coin Analyze",
            icon: "ri-dashboard-2-line",
            link: "/#",
            stateVariables: isCoinAnalyzer,
            click: function (e) {
                e.preventDefault();
                setIsCoinAnalyzer(!isCoinAnalyzer);
                setIscurrentState('CoinAnalyzer');
                updateIconSidebar(e);
            },
            subItems: [
                {
                    id: "CoinMangement",
                    label: "Coin Management",
                    link: "/coin-management",
                    parentId: "coinanalyzer",
                },
                {
                    id: "Coin Graph",
                    label: "Coin Graph",
                    link: "/coin-graph",
                    parentId: "coinanalyzer",
                },
            ],
        },
        {
            id: "newsmanagement",
            label: "News Management",
            icon: "ri-dashboard-2-line",
            link: "/#",
            click: function (e) {
                e.preventDefault();
                setIsNewsMgt(!isNewsMgt);
                setIscurrentState('NewsMgt');
                updateIconSidebar(e);
            },
            stateVariables: isNewsMgt,
            subItems: [
                {
                    id: "clients",
                    label: "Clients",
                    link: "/client-setting",
                    parentId: "newsmanagement",
                },
                {
                    id: "keywords",
                    label: "Keywords",
                    link: "/keyword-setting",
                    parentId: "newsmanagement",
                },
            ],
        },
    ];
    return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;