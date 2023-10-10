FROM node:20
RUN apt update -y && apt install nano sudo systemctl -y
RUN useradd -G sudo -m avalanche
RUN echo avalanche:avalanche | chpasswd
WORKDIR /avalanche

# Avalanche CLI is a tool to simulate a network of 5 nodes. In this network we can create custom subnet for testing purpose
# After test in local network we can deploy the subnet to the Fuji testnet and connect our wallets to it
COPY avalanche-cli.sh .
RUN chown avalanche:avalanche *.sh && chmod 755 *.sh
RUN chown avalanche:avalanche /avalanche
USER avalanche
WORKDIR /home/avalanche
COPY .avalanche-cli.json .
WORKDIR /avalanche
RUN git clone https://github.com/ava-labs/avalanche-smart-contract-quickstart.git
RUN cd avalanche-smart-contract-quickstart && yarn
RUN ./avalanche-cli.sh
RUN echo "export PATH=~/bin:$PATH" >> /home/avalanche/.bashrc
RUN echo "alias deploy=\"avalanche subnet deploy spain\"" >> /home/avalanche/.bashrc
RUN echo "alias ava=\"avalanche\"" >> /home/avalanche/.bashrc
RUN echo "alias avan=\"avalanche network\"" >> /home/avalanche/.bashrc
RUN echo "alias avas=\"avalanche subnet\"" >> /home/avalanche/.bashrc
RUN echo "alias pbu=\"cd /home/avalanche/citizenchain/src/\"" >> /home/avalanche/.bashrc
RUN echo "alias deploy=\"yarn deploy\"" >> /home/avalanche/.bashrc
RUN echo "alias main=\"yarn main\"" >> /home/avalanche/.bashrc
RUN echo Yes | /home/avalanche/bin/avalanche subnet list
WORKDIR /home/avalanche
USER root
COPY genesis/sidecar.json /home/avalanche/.avalanche-cli/subnets/spain/sidecar.json
COPY genesis/spain.json /home/avalanche/.avalanche-cli/subnets/spain/genesis.json
RUN chown avalanche:avalanche -R /home/avalanche/

USER avalanche
RUN mkdir /home/avalanche/citizenchain && mkdir /home/avalanche/citizenchain/src
#RUN /home/avalanche/bin/avalanche subnet deploy spain --local
#RUN /home/avalanche/bin/avalanche network start
CMD bash


# Run you own node, not required. Run your own node it is not required because we can deploy in Fuji and use the oficial nodes to connect our wallets with Fuji testnet
# Use our own node it desired if we want to keep aour own copy of the blockchain book, does not use centralizad nodes and has our custom RPC endpoint
#COPY avalanchego_installer.sh .
#COPY network-runner_installer.sh .
#RUN chown avalanche:avalanche *.sh && chmod 755 *.sh
#USER avalanche
#RUN echo avalanche | ./avalanchego_installer.sh
#USER root
#CMD systemctl start avalanchego && bash