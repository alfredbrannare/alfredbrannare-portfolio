package se.alfredbrannare.backend.storage;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.localstack.LocalStackContainer;
import org.testcontainers.utility.DockerImageName;
import se.alfredbrannare.backend.storage.config.R2Config;
import se.alfredbrannare.backend.storage.service.StorageService;
import se.alfredbrannare.backend.storage.service.StorageServiceImpl;
import software.amazon.awssdk.services.s3.S3Client;

@SpringBootTest(classes = {R2Config.class, StorageServiceImpl.class})
@Testcontainers
public class StorageIntegrationTest {

  @Container
  static LocalStackContainer localStack =
      new LocalStackContainer(DockerImageName.parse("localstack/localstack:4.4.0"))
          .withServices("s3");

  @Autowired private S3Client s3Client;

  @Autowired private StorageService storageService;

  @DynamicPropertySource
  static void r2Props(DynamicPropertyRegistry registry) {
    registry.add("r2.endpoint", () -> localStack.getEndpoint().toString());
    registry.add("r2.access-key", localStack::getAccessKey);
    registry.add("r2.secret-key", localStack::getSecretKey);
    registry.add("r2.bucket", () -> "test-bucket");
    registry.add("r2.public-base", () -> "https://public.example.com");
    registry.add("r2.region", () -> localStack.getRegion());
  }

  @BeforeEach
  void setUp() {
    s3Client.createBucket(b -> b.bucket("test-bucket"));
  }

  @Test
  void upload_storesObjectAndReturnsUrl() {
    MockMultipartFile file =
        new MockMultipartFile("file", "test.jpeg", "image/jpeg", "test".getBytes());

    String result = storageService.upload(file);

    assertThat(result).startsWith("https://public.example.com/projects/").endsWith(".jpg");

    var objects = s3Client.listObjectsV2(b -> b.bucket("test-bucket")).contents();
    assertThat(objects).hasSize(1);
    assertThat(objects.getFirst().key()).startsWith("projects/").endsWith(".jpg");
  }
}
