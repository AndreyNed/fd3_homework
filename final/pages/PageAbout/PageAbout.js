import React from 'react';

import { CONFIG_DEBUG_MODE, CONFIG_DEBUG_MODE_PAGE_ABOUT } from '../../config/config';

import './PageAbout.scss';

class PageAbout extends React.PureComponent {

    constructor( props ) {
        super( props );
        this.classCSS= 'PageAbout';
        this.debugMode = CONFIG_DEBUG_MODE && CONFIG_DEBUG_MODE_PAGE_ABOUT;
    }

    render() {
        return (
            <div className = { this.classCSS }>
                <div className="wrapper">
                    <div className = { `${ this.classCSS }_header` }
                         key="header">
                        iAccount - система управления домашними финансами.
                    </div>
                    <div className = { `${ this.classCSS }_content` }
                         key="content">
                        <div className="rows sections"
                             key="row_1">
                            <div className="cols col_16">
                                <p className="subheader"
                                   key="1">
                                    Описание:
                                </p>
                                <p key="2">
                                    Итоговый проект в рамках обучающего курса "React и Angular для разработки веб-приложений" в СООО "Образовательный центр Парка высоких технологий".
                                </p>
                            </div>
                        </div>
                        <div className="rows sections"
                             key="row_2">
                            <div className="cols col_16">
                                <p className="subheader"
                                   key="3">
                                    Функции
                                </p>
                                <ul className="cursive_list">
                                    <li key="function_1">
                                        <p>Учет денежных средств</p>
                                    </li>
                                    <li key="function_2">
                                        <p>Анализ расходов и поступлений</p>
                                    </li>
                                    <li key="function_3">
                                        <p>Планирование расходов</p>
                                    </li>
                                    <li key="function_4">
                                        <p>Анализ курсов валют по данным НБРБ</p>
                                    </li>
                                    <li key="function_5">
                                        <p>Мультивалютный калькулятор</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="rows sections"
                             key="row_3">
                            <div className="cols col_16">
                                <p className="subheader"
                                   key="4">
                                    Детали реализации
                                </p>
                                <p key="5">
                                    Разработаны клиентская и серверная части для работы с частной финансовой информацией.
                                </p>
                                <p key="6">
                                    Использовано открытое API НБРБ для функционала курсов валют, валютного калькулятора.
                                </p>
                                <p key="7">
                                    <strong>Клиентская часть</strong> - одностраничное приложение ( SPA ). Язык разработки - <strong>Javascript</strong>, с использованием <strong>React/Redux</strong>. <strong>Все компоненты проекта являются собственной оригинальной разработкой</strong>.
                                </p>
                                <p key="8">
                                    <strong>Серверная часть</strong> - сервисное веб-приложение. Язык разработки - <strong>Java</strong>. Использованы паттерны проектирования MVC, Command.
                                </p>
                                <p key="9">
                                    Хранение информации - СУБД MySQL.
                                </p>
                                <p key="10">
                                    Благодаря особенностям архитектуры, серверная часть легко расширяется для работы с другими средствами хранения данных (MsExcel, XML, др.)
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PageAbout;
