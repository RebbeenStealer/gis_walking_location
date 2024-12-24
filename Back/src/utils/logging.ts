import pino from 'pino'

let project: string | undefined;
export const initLogCorrelation = (projectId : string) => {
    project = projectId;
}

const formatters = {
    level(label: string){
        return {severity : label}
    },
}

export const logger = pino({
    formatters,
    messageKey : 'message',
})