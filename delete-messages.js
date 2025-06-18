// Script para deletar TODAS as mensagens no Twitter/X (compatível com PT-BR e EN)
(async function() {
    // Verifica se estamos na página correta
    if (!window.location.href.includes('x.com/messages') && !window.location.href.includes('twitter.com/messages')) {
        alert('Please navigate to X/Twitter messages page (https://x.com/messages) before running this script.\n\nPor favor, acesse a página de mensagens do X/Twitter (https://x.com/messages) antes de executar este script.');
        return;
    }

    // Configurações multilíngue
    const languageSettings = {
        uiElements: {
            conversationInfo: {
                pt: 'Informações da conversa',
                en: 'Conversation info'
            },
            backButton: {
                pt: 'Voltar',
                en: 'Back'
            },
            deleteOption: {
                pt: 'Sair da conversa',
                en: 'Leave conversation'
            }
        },
        messages: {
            starting: {
                pt: 'Iniciando processo de deleção...',
                en: 'Starting deletion process...'
            },
            loading: {
                pt: 'Carregando mais mensagens...',
                en: 'Loading more messages...'
            },
            foundConversations: {
                pt: (count) => `Encontradas ${count} conversas.`,
                en: (count) => `Found ${count} conversations.`
            },
            noMoreMessages: {
                pt: 'Nenhuma mensagem encontrada! Processo concluído.',
                en: 'No more messages found! Process completed.'
            },
            finished: {
                pt: (count) => `CONCLUÍDO! Total de mensagens deletadas: ${count}`,
                en: (count) => `FINISHED! Total messages deleted: ${count}`
            }
        }
    };

    // Detectar idioma da página
    const detectLanguage = () => {
        const htmlLang = document.documentElement.lang;
        if (htmlLang.includes('pt')) return 'pt';
        if (htmlLang.includes('en')) return 'en';
        
        // Fallback: verificar textos na página
        const testElements = [
            {text: 'Informações da conversa', lang: 'pt'},
            {text: 'Conversation info', lang: 'en'}
        ];
        
        for (const element of testElements) {
            if (document.body.textContent.includes(element.text)) {
                return element.lang;
            }
        }
        
        return 'en'; // Default para inglês
    };

    const currentLang = detectLanguage();
    console.log(`Idioma detectado: ${currentLang === 'pt' ? 'Português' : 'Inglês'}`);

    // Função para esperar um tempo aleatório entre ações
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    
    // Função para rolar a lista de mensagens
    const scrollMessages = async () => {
        let previousHeight = 0;
        let currentHeight = document.documentElement.scrollHeight;
        let attempts = 0;
        const maxAttempts = 5;
        
        while (attempts < maxAttempts && previousHeight !== currentHeight) {
            attempts++;
            previousHeight = currentHeight;
            window.scrollTo(0, currentHeight);
            await delay(2000 + Math.random() * 3000);
            currentHeight = document.documentElement.scrollHeight;
        }
    };
    
    // Função para clicar em um elemento com segurança
    const safeClick = async (element, description) => {
        if (!element) {
            console.log(`${currentLang === 'pt' ? 'Elemento não encontrado:' : 'Element not found:'} ${description}`);
            return false;
        }
        
        try {
            element.click();
            await delay(1000 + Math.random() * 2000);
            return true;
        } catch (err) {
            console.error(`${currentLang === 'pt' ? 'Erro ao clicar em' : 'Error clicking on'} ${description}:`, err);
            return false;
        }
    };
    
    // Função para verificar se há mais mensagens
    const hasMoreMessages = () => {
        return document.querySelectorAll('div[data-testid="conversation"]').length > 0;
    };
    
    // Função principal para deletar mensagens
    const deleteConversationBatch = async () => {
        let deletedCount = 0;
        const conversations = Array.from(document.querySelectorAll('div[data-testid="conversation"]'));
        
        for (const conversation of conversations) {
            try {
                // Abre a conversa
                if (!await safeClick(conversation, currentLang === 'pt' ? 'conversa' : 'conversation')) continue;
                await delay(2000 + Math.random() * 3000);
                
                // Encontra o botão de menu (compatível com ambos idiomas)
                const menuButton = document.querySelector(`a[aria-label="${languageSettings.uiElements.conversationInfo[currentLang]}"]`);
                if (!menuButton) continue;
                
                // Abre o menu
                if (!await safeClick(menuButton, currentLang === 'pt' ? 'menu de opções' : 'options menu')) continue;
                await delay(1000 + Math.random() * 2000);
                
                // Encontra a opção de deletar (compatível com ambos idiomas)
                const deleteButton = Array.from(document.querySelectorAll('button span')).find(span => 
                    span.textContent.includes(languageSettings.uiElements.deleteOption[currentLang])
                );
                if (!deleteButton) continue;
                
                // Seleciona deletar
                if (!await safeClick(deleteButton.closest('button'), currentLang === 'pt' ? 'opção deletar' : 'delete option')) continue;
                await delay(1000 + Math.random() * 2000);
                
                // Confirma a deleção
                const confirmButton = document.querySelector('button[data-testid="confirmationSheetConfirm"]');
                if (!confirmButton) continue;
                
                if (!await safeClick(confirmButton, currentLang === 'pt' ? 'confirmação' : 'confirmation')) continue;
                
                deletedCount++;
                console.log(`${currentLang === 'pt' ? 'Deletadas' : 'Deleted'} ${deletedCount} ${currentLang === 'pt' ? 'conversas' : 'conversations'}`);
                await delay(3000 + Math.random() * 4000);
                
                // Volta para a lista de conversas
                const backButton = document.querySelector(`div[aria-label="${languageSettings.uiElements.backButton[currentLang]}"]`);
                if (backButton) {
                    await safeClick(backButton, currentLang === 'pt' ? 'botão voltar' : 'back button');
                    await delay(2000 + Math.random() * 3000);
                }
            } catch (err) {
                console.error(currentLang === 'pt' ? 'Erro ao processar conversa:' : 'Error processing conversation:', err);
                await delay(5000);
            }
        }
        
        return deletedCount;
    };
    
    // Loop infinito de deleção
    const deleteAllMessages = async () => {
        try {
            let totalDeleted = 0;
            let cycles = 0;
            const maxCycles = 50; // Limite de segurança
            
            console.log(languageSettings.messages.starting[currentLang]);
            
            while (cycles < maxCycles) {
                cycles++;
                console.log(`${currentLang === 'pt' ? 'Ciclo' : 'Cycle'} ${cycles}...`);
                
                console.log(languageSettings.messages.loading[currentLang]);
                await scrollMessages();
                
                if (!hasMoreMessages()) {
                    console.log(languageSettings.messages.noMoreMessages[currentLang]);
                    break;
                }
                
                const batchResult = await deleteConversationBatch();
                totalDeleted += batchResult;
                
                if (batchResult === 0) {
                    console.log(currentLang === 'pt' ? 'Nenhuma conversa deletada neste ciclo, assumindo conclusão.' : 'No conversations deleted this cycle, assuming completion.');
                    break;
                }
                
                console.log(`${currentLang === 'pt' ? 'Ciclo' : 'Cycle'} ${cycles} ${currentLang === 'pt' ? 'completo. Total deletado:' : 'completed. Total deleted:'} ${totalDeleted}`);
                await delay(5000);
            }
            
            console.log(languageSettings.messages.finished[currentLang](totalDeleted));
            alert(currentLang === 'pt' 
                ? `Concluído! ${totalDeleted} mensagens deletadas.` 
                : `Completed! ${totalDeleted} messages deleted.`);
        } catch (err) {
            console.error(currentLang === 'pt' ? 'Erro fatal:' : 'Fatal error:', err);
            alert(currentLang === 'pt' 
                ? 'Ocorreu um erro no script. Verifique o console para detalhes.' 
                : 'An error occurred in the script. Check console for details.');
        }
    };
    
    // Inicia o processo
    await deleteAllMessages();
})();
