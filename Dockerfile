ARG KIBANA_VERSION=latest
FROM kibana:${KIBANA_VERSION}

ARG PLUGIN_VERSION
ADD build/kibana-s4i-ng-plugin-${PLUGIN_VERSION}.zip /opt/plugin.zip
RUN ./bin/kibana-plugin install file:///opt/plugin.zip --no-optimize
RUN NODE_OPTIONS="--max-old-space-size=2048" ./bin/kibana --optimize --verbose
