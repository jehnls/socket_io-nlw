import { io } from '../http';
import { ConnectionService } from '../services/ConnectionService';
import { MessagesService } from '../services/MessagesService';
import { UserService } from '../services/UsersService';

interface IParams {
  text: string,
  email: string
}

io.on('connect', (socket) => {
  const connectionsServices = new ConnectionService();
  const usersService = new UserService();
  const messagesServece = new MessagesService();

  socket.on('client_first_access', async (params) => {
    const socket_id = socket.id;
    const { text, email } = params as IParams;
    let user_id = null;

    const userExites = await usersService.findByEmail(email);

    if (!userExites) {
      const user = await usersService.create(email);

      await connectionsServices.create({
        socket_id,
        user_id: user.id
      });
      user_id = user.id
    } else {
      user_id = userExites.id;
      const connection = await connectionsServices.findByUserID(userExites.id);

      if (!connection) {
        await connectionsServices.create({
          socket_id,
          user_id: userExites.id,
        });
      } else {
        connection.socket_id = socket_id;
        await connectionsServices.create(connection);
      }
    }

    await messagesServece.create({
      text,
      user_id
    });

    const allMessages = await messagesServece.listByUser(user_id);

    socket.emit('client_list_all_messages', allMessages);

    const allUsers = await connectionsServices.findAllWithoutAdmin();
    io.emit('admin_list_all_users', allUsers);

  });

  socket.on('client_send_to_admin', async params => {
    const { text, socket_admin_id } = params;

    const socket_id = socket.id

    const { user_id } = await connectionsServices.findBySocketID(socket_id);

    const message = await messagesServece.create({
      text,
      user_id
    });

    io.to(socket_admin_id).emit('admin_receive_message', {
      message,
      socket_id,
    });
  });
});