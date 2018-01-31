export const SERVER_URI = 'http://localhost:8080/iaccount/IAccount';

export const CURRENCY_URI = 'http://www.nbrb.by/API/ExRates';

export const CURRENCY_DAILY_ALL = '/Rates/?Periodicity=0';

export const CURRENCY_ALL = '/Currencies';

export const CURRENCY_DYNAMIC = ( Cur_ID, startDate, endDate ) => {
    return `/Rates/Dynamics/${ Cur_ID }?startDate=${ startDate }&endDate=${ endDate }`;
};

// Динамика курса за период не более 365 дней по коду валюты и датам
// http://www.nbrb.by/API/ExRates/Rates/Dynamics/145?startDate=2017-1-1&endDate=2017-12-31