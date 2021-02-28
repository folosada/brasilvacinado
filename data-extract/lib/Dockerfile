FROM amazonlinux:1
WORKDIR /
RUN yum update -y
# Install Python 3.8
RUN yum install gcc openssl-devel wget tar -y
RUN wget https://www.python.org/ftp/python/3.8.7/Python-3.8.7.tgz
RUN tar -xzvf Python-3.8.7.tgz
WORKDIR /Python-3.8.7
RUN ./configure --enable-optimizations
RUN make install
# Install Python packages
RUN mkdir /packages
RUN echo "pandas==1.2.1" >> /packages/requirements.txt
RUN echo "requests==2.25.1" >> /packages/requirements.txt
RUN echo "numpy==1.19.5" >> /packages/requirements.txt
RUN mkdir -p /packages/pandas-python-3.8/python/lib/python3.8/site-packages
RUN pip3.8 install -r /packages/requirements.txt -t /packages/pandas-python-3.8/python/lib/python3.8/site-packages
