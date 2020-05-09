**RF: Requisitos funcionais**
**RNF: Requisitos não funcionais**
**RN: Regras de negócio**

# Recuperação de senha

**RF**
- O usuário deve conseguir recuperar a senha informando seu e-mail;
- O usuário deve receber um e-mail com instruções de recuperação de senha;
- O usuário deve conseguir resetar sua senha;

**RFN**
- Utilizar MailTrap para testar envios de e-mail em ambiente de desenvolvimento;
- Utilizar Amazon SES para envios de e-mail em produção;
- O envio de e-mail deve acontecer em segundo plano (background job);

**RN**
- O link de reset de senha deve expirar em 2 horas;
- O usuário precisa confirmar a nova senha ao resetar sua senha;

# Atualização de perfil

**RF**
- O usuário deve conseguir atualizar seu perfil (Nome, avatar, e-mail e senha);

**RN**
- O usuário não pode alterar seu e-mail para um e-mail já cadastrado;
- Para atualizar sua senha, o usuário deve informar sua senha antiga;
- Para atualizar sua senha, o usuário deve confirmar sua nova senha;

# Painel do prestador

**RF**
- O prestador deve conseguir visualizar os agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve conseguir visualziar as notificações não lidas;

**RNF**
- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificações do prestador devem armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo real utilizando o Socket.io;

**RN**
- A notificação deve possuir um status de lida ou não-lida;


# Agendamento de serviços
**RF**
- O usuário deve conseguir visualizar os prestadores de serviço cadastrados;
- O usuário deve conseguir visualizar os dias em que o prestador possui um horário disponível em um calendário;
- O usuário deve conseguir visualizar os horários disponíveis de um prestador em um dia específico;
- O usuário deve conseguir realizar um novo agendamento com um prestador;

**RNF**
- A listagem de prestadores deve ser armazenada em cache;

**RN**
- Cada agendamento deve durar exatamente uma hora;
- Os horários de agendamentos devem estar disponíveis entre as 8h até 17h (finalizando as 18h);
- O usuário não deve conseguir agendar em um horário já ocupado por outro usuário;
- O usuário não deve conseguir agendar em um horário no passado;
- O usuário não pode agendar serviços com ele mesmo;


