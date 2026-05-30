package se.alfredbrannare.backend.storage.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import java.io.IOException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;
import se.alfredbrannare.backend.storage.config.R2Properties;
import se.alfredbrannare.backend.storage.exception.InvalidFileTypeException;
import se.alfredbrannare.backend.storage.exception.StorageException;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

@ExtendWith(MockitoExtension.class)
public class StorageServiceImplTest {

  @Mock private S3Client s3Client;

  private final R2Properties props =
      new R2Properties(
          "https://api.example.com", "key", "secret", "test-bucket", "https://public.example.com");

  private StorageServiceImpl storageService;

  @BeforeEach
  void setUp() {
    storageService = new StorageServiceImpl(s3Client, props);
  }

  @Test
  void upload_returnsPublicUrlWithGeneratedKey() {
    MockMultipartFile file =
        new MockMultipartFile("file", "test.jpg", "image/jpeg", "test".getBytes());

    String result = storageService.upload(file);
    assertThat(result).startsWith("https://public.example.com/projects/");
    assertThat(result).endsWith(".jpg");
  }

  @Test
  void upload_throwsWhenContentTypeUnsupported() {
    MockMultipartFile file =
        new MockMultipartFile("file", "test.txt", "text/plain", "test".getBytes());

    assertThatThrownBy(() -> storageService.upload(file))
        .isInstanceOf(InvalidFileTypeException.class);
    verify(s3Client, never()).putObject(any(PutObjectRequest.class), any(RequestBody.class));
  }

  @Test
  void upload_throwsWhenContentTypeNull() {
    MockMultipartFile file = new MockMultipartFile("file", "test.txt", null, "test".getBytes());

    assertThatThrownBy(() -> storageService.upload(file))
        .isInstanceOf(InvalidFileTypeException.class);
    verify(s3Client, never()).putObject(any(PutObjectRequest.class), any(RequestBody.class));
  }

  @Test
  void upload_passesCorrectBucketAndContentType() {
    MockMultipartFile file =
        new MockMultipartFile("file", "test.jpg", "image/jpeg", "test".getBytes());

    ArgumentCaptor<PutObjectRequest> captor = ArgumentCaptor.forClass(PutObjectRequest.class);

    storageService.upload(file);

    verify(s3Client).putObject(captor.capture(), any(RequestBody.class));

    PutObjectRequest request = captor.getValue();
    assertThat(request.bucket()).isEqualTo("test-bucket");
    assertThat(request.contentType()).isEqualTo("image/jpeg");
  }

  @Test
  void upload_throwsStorageException() throws IOException {
    MultipartFile file = mock(MultipartFile.class);

    when(file.getContentType()).thenReturn("image/jpeg");
    when(file.getInputStream()).thenThrow(new IOException());

    assertThatThrownBy(() -> storageService.upload(file)).isInstanceOf(StorageException.class);
  }
}
