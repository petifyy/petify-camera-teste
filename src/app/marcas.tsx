// Cada marca tem seus próprios passos. Para incluir uma marca nova:
// 1) copie um bloco abaixo e troque os textos
// 2) adicione a logo em marcas.tsx (objeto logosMarcas)

export const MARCAS = [
  {
    id: 'intelbras',
    nome: 'Intelbras',
    porta: 80,
    modelos: ['Linha Mibo iM5 / iM5 S', 'Linha VIP (confirmar modelo)'],
    dica: 'Nem todo modelo Intelbras tem ONVIF. Confira na caixa ou no manual.',
    usuarioPlaceholder: 'Normalmente: admin',
    senhaPlaceholder: 'Senha que você criou na instalação',
    atencao:
      'Nas câmeras Mibo, a senha costuma ser a "chave de acesso" criada na instalação. Pode ser diferente da senha da sua conta no app.',
    passos: [
      {
        icone: 'power-outline',
        titulo: 'Ligue a câmera',
        texto: 'Conecte na tomada e espere ela iniciar (cerca de 1 minuto).',
      },
      {
        icone: 'wifi-outline',
        titulo: 'Coloque no Wi-Fi de casa',
        texto:
          'Configure pelo app da Intelbras (Mibo Smart, nas câmeras iM). O celular precisa estar no mesmo Wi-Fi da câmera.',
      },
      {
        icone: 'search-outline',
        titulo: 'Descubra o endereço IP',
        texto:
          'Veja nas informações da câmera no app ou na lista de aparelhos do seu roteador.',
      },
      {
        icone: 'key-outline',
        titulo: 'Anote usuário e senha',
        texto:
          'O usuário costuma ser "admin". A senha é a que você criou ao instalar a câmera.',
      },
    ],
  },
  {
    id: 'tapo',
    nome: 'TP-Link Tapo',
    porta: 2020,
    modelos: ['C200', 'C210', 'C310'],
    dica: 'A Tapo só libera o acesso depois de criar a "Conta da câmera" no app.',
    usuarioPlaceholder: 'Usuário da Conta da câmera',
    senhaPlaceholder: 'Senha da Conta da câmera',
    atencao:
      'Use o usuário e a senha da "Conta da câmera", e não o login da sua conta Tapo.',
    passos: [
      {
        icone: 'power-outline',
        titulo: 'Ligue a câmera',
        texto: 'Conecte na tomada e espere ela iniciar.',
      },
      {
        icone: 'wifi-outline',
        titulo: 'Configure no app Tapo',
        texto:
          'Adicione a câmera no app Tapo e conecte no Wi-Fi 2,4 GHz da sua casa.',
      },
      {
        icone: 'person-outline',
        titulo: 'Crie a "Conta da câmera"',
        texto:
          'No app Tapo, abra a câmera > Configurações > Avançado > Conta da câmera. Crie um usuário e uma senha (6 a 32 caracteres). O nome do menu pode mudar conforme a versão do app.',
      },
      {
        icone: 'search-outline',
        titulo: 'Descubra o endereço IP',
        texto:
          'Veja nas informações do dispositivo, no app Tapo, ou na lista de aparelhos do roteador.',
      },
    ],
  },
  {
    id: 'reolink',
    nome: 'Reolink',
    porta: 8000,
    modelos: ['Modelos ligados na tomada (confirmar modelo)'],
    dica: 'Modelos de bateria geralmente não têm ONVIF.',
    usuarioPlaceholder: 'Ex.: admin',
    senhaPlaceholder: 'Mesma senha do app Reolink',
    atencao:
      'Use o mesmo usuário e senha que você usa para abrir a câmera no app Reolink.',
    passos: [
      {
        icone: 'power-outline',
        titulo: 'Ligue a câmera',
        texto: 'Conecte na tomada e espere ela iniciar.',
      },
      {
        icone: 'wifi-outline',
        titulo: 'Configure no app Reolink',
        texto:
          'Adicione a câmera no app Reolink e conecte no Wi-Fi de casa. O celular precisa estar na mesma rede.',
      },
      {
        icone: 'settings-outline',
        titulo: 'Ative o ONVIF',
        texto:
          'Em algumas Reolink ele vem desligado. Vá em Configurações > Rede > Avançado > Portas e ative ONVIF e RTSP. Se não achar no celular, use o programa Reolink Client no computador.',
      },
      {
        icone: 'search-outline',
        titulo: 'Descubra o endereço IP',
        texto:
          'Veja nas informações do dispositivo no app Reolink ou na lista de aparelhos do roteador.',
      },
    ],
  },
  {
    id: 'jortan',
    nome: 'JORTAN',
    porta: 80,
    modelos: ['Confirmar modelo'],
    dica: 'O suporte a ONVIF muda de modelo para modelo. Se a opção não existir nas configurações, a câmera não é compatível.',
    usuarioPlaceholder: 'Ex.: admin',
    senhaPlaceholder: 'Senha da câmera',
    atencao:
      'Se não conectar, confira se o ONVIF está ativado na câmera e se o modelo é compatível.',
    passos: [
      {
        icone: 'power-outline',
        titulo: 'Ligue a câmera',
        texto: 'Conecte na tomada e espere ela iniciar.',
      },
      {
        icone: 'wifi-outline',
        titulo: 'Configure pelo app da câmera',
        texto:
          'Use o app indicado na caixa ou no manual e conecte a câmera no Wi-Fi de casa.',
      },
      {
        icone: 'settings-outline',
        titulo: 'Procure a opção ONVIF',
        texto:
          'Nas configurações da câmera, procure por ONVIF (ou RTSP) e ative. Se não existir, esse modelo não é compatível.',
      },
      {
        icone: 'search-outline',
        titulo: 'Descubra o endereço IP',
        texto:
          'Veja nas informações da câmera no app ou na lista de aparelhos do roteador.',
      },
    ],
  },
];