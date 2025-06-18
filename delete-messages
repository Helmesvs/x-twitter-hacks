// Script para deletar mensagens no Twitter/X (com seletores atualizados para os novos botões)
(async function() {
    // Verifica se estamos na página correta
    if (!window.location.href.includes('x.com/messages')) {
        alert('Por favor, navegue até a página de mensagens do Twitter (https://twitter.com/messages) antes de executar este script.');
        return;
    }

    // Função para esperar um tempo aleatório entre ações
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    
    // Função para rolar a lista de mensagens
    const scrollMessages = async () => {
        let previousHeight = 0;
        let currentHeight = document.documentElement.scrollHeight;
        
        while (previousHeight !== currentHeight) {
            previousHeight = currentHeight;
            window.scrollTo(0, currentHeight);
            await delay(2000 + Math.random() * 3000);
            currentHeight = document.documentElement.scrollHeight;
        }
    };
    
    // Função para clicar em um elemento e verificar se foi bem-sucedido
    const safeClick = async (element, description) => {
        if (!element) {
            console.log(`Elemento não encontrado: ${description}`);
            return false;
        }
        
        try {
            element.click();
            await delay(1000 + Math.random() * 2000);
            return true;
        } catch (err) {
            console.error(`Erro ao clicar em ${description}:`, err);
            return false;
        }
    };
    
    // Função principal para deletar mensagens
    const deleteMessages = async () => {
        try {
            console.log('Iniciando processo de deleção...');
            
            // Primeiro, rolamos para carregar todas as mensagens
            console.log('Carregando mais mensagens...');
            await scrollMessages();
            
            // Encontramos todas as conversas
            const conversations = Array.from(document.querySelectorAll('div[data-testid="conversation"]'));
            console.log(`Encontradas ${conversations.length} conversas.`);
            
            let deletedCount = 0;
            
            for (const conversation of conversations) {
                try {
                    // Clica na conversa para abrir
                    console.log('Abrindo conversa...');
                    if (!await safeClick(conversation, 'conversa')) continue;
                    
                    await delay(2000 + Math.random() * 3000);
                    
                    // Encontra o botão de menu (i) - baseado no HTML fornecido anteriormente
                    const menuButton = document.querySelector('a[aria-label="Informações da conversa"]');
                    if (!menuButton) {
                        console.log('Botão de menu não encontrado, pulando...');
                        continue;
                    }
                    
                    // Clica no menu
                    console.log('Abrindo menu...');
                    if (!await safeClick(menuButton, 'menu de opções')) continue;
                    
                    await delay(1000 + Math.random() * 2000);
                    
                    // Encontra o botão "Sair da conversa" (vermelho)
                    const deleteButton = document.querySelector('button div[style*="color: rgb(244, 33, 46)"] span');
                    if (!deleteButton) {
                        console.log('Botão "Sair da conversa" não encontrado, pulando...');
                        continue;
                    }
                    
                    // Clica para deletar
                    console.log('Selecionando "Sair da conversa"...');
                    if (!await safeClick(deleteButton.closest('button'), 'opção deletar')) continue;
                    
                    await delay(1000 + Math.random() * 2000);
                    
                    // Encontra o botão de confirmação "Sair" (vermelho)
                    const confirmButton = document.querySelector('button[data-testid="confirmationSheetConfirm"]');
                    if (!confirmButton) {
                        console.log('Botão de confirmação não encontrado, pulando...');
                        continue;
                    }
                    
                    // Confirma a deleção
                    console.log('Confirmando deleção...');
                    if (!await safeClick(confirmButton, 'confirmação de deleção')) continue;
                    
                    deletedCount++;
                    console.log(`Deletado ${deletedCount} conversas.`);
                    await delay(3000 + Math.random() * 4000); // Espera mais tempo após deletar
                    
                    // Volta para a lista de conversas (se necessário)
                    const backButton = document.querySelector('div[aria-label="Voltar"], div[aria-label="Back"]');
                    if (backButton) {
                        await safeClick(backButton, 'botão voltar');
                        await delay(2000 + Math.random() * 3000);
                    }
                    
                } catch (err) {
                    console.error('Erro ao processar conversa:', err);
                    await delay(5000); // Espera mais tempo em caso de erro
                }
            }
            
            console.log(`Processo concluído. Total de ${deletedCount} conversas deletadas.`);
        } catch (err) {
            console.error('Erro no script:', err);
        }
    };
    
    // Inicia o processo
    await deleteMessages();
})();
