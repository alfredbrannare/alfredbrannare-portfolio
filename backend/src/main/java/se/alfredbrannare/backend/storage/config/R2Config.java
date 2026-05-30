package se.alfredbrannare.backend.storage.config;

import java.net.URI;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;

@Configuration
@EnableConfigurationProperties(R2Properties.class)
public class R2Config {

  @Bean
  S3Client s3Client(R2Properties props) {
    return S3Client.builder()
        .endpointOverride(URI.create(props.endpoint()))
        .region(Region.of(props.region()))
        .credentialsProvider(
            StaticCredentialsProvider.create(
                AwsBasicCredentials.create(props.accessKey(), props.secretKey())))
        .build();
  }
}
